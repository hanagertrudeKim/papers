---
title: "💻 2024년 하반기 공유"
date: "2024-02-21"
tag: "DeepDive"
---

# 1. import로 인한 순환 참조 문제를 해결하는 방법

### Intro

프로젝트 규모가 점차 커질수록 분리되는 파일들도 늘어나고 `import` `export` 관계가 복잡해질 수 있습니다. 이런 경우 어떤 한 파일에 다른 파일이 서로 참조하는 문제가 발생할 수 있습니다.

실제로 프로젝트에서도 저는 정말 가끔씩 `import` 되는 모듈 파일을 인식하지 못해 알 수 없는 빨간줄 에러가 뜬 적이 있는데, ‘순환 참조 (circular dependency) 문제’ 와 연관이 있을수도 있겠다는 생각이 들었습니다.

따라서 순환 참조가 무엇인지 인식하고 순환 참조를 해결/예방하기 위한 간단한 패턴들을 소개해보겠습니다.

### 순환 참조란?

자바스크립트 모듈 시스템에서는 기본적으로 순환 참조를 허용합니다. 순환 참조란 서로가 서로를 참조하는 상태를 이야기합니다. JS 에서는 이를 시스템에서 걸러내지 않고, 한쪽의 `export` 를 빈 객체로 만들어 버립니다.

아래 예시는 순환 참조의 대표적 예시입니다.

```jsx
// index.js
import "./a.js";

// a.js
import { sayHello } from "./b.js";

export const NAME = "mike";

console.log("module_a");
sayHello();

// b.js
import { NAME } from "./a.js";

console.log("module_b");

export const sayHello = () => {
  console.log("hello~!", NAME);
};
```

여기서 `b.js` 에서 `sayHello()` 함수를 읽는 형태는 다음과 같습니다.

```jsx
export const sayHello = () => {
  console.log("hello~!", aModuleObject.Name);
};
```

NAME 을 a 모듈의 객체라고 읽을 수 있는 이유는 `a.js` 에서 NAME 변수를 내보내는 시점이 `sayHello()` 호출부 이전 이기 때문입니다.

만약 NAME 변수 내보내는 시점을 `sayHello()` 호출부 이후로 보내면 에러가 발생하게 됩니다. 이러한 문제들이 겹치게 되면, 순환 참조 문제가 생기게 된다고 설명합니다.

### 순환 참조에서 문제가 났을때 알아차리기 힘든 이유

- ESM 에서는 모듈에서 없는 속성을 가져올때 에러가 발생합니다.
  ⇒ 명시적으로 에러가 발생하기 때문에 순환 참조 오류를 빠르게 인식할 수 있습니다.
- commonJS 에서는 모듈에서 없는 속성을 가져오면 일반적인 객체처럼 `undefined`가 반환되고 에러를 발생시키지 않습니다.
  ⇒ 순환 참조 문제를 쉽게 알아차리지 못합니다. (commonJS을 사용하는 웹팩의 경우 순환 참조 문제를 발견하기 힘듭니다.)

### 가장 명시적인 해결 방법 - 내부 모듈 패턴(Internal module pattern)

가장 명시적인 해결 방법은 모듈의 평가 순서를 내부적으로 정의하는 파일을 만드는 것 입니다.

따라서, 모듈을 가져올때 항상 그 파일로부터 가져오는 형태를 갖추게 됩니다.

핵심은 다른 모듈들을 직접적으로 불러오지 않도록 하는 것 입니다.

위의 예시의 모듈을의 순서를 다음과 같이 `modules.js` 파일에 정의할 수 있습니다.

```jsx
// modules.js
export * from "./b.js";
export * from "./a.js";
```

모듈 호출부는 다음과 같이 달라질 것입니다.

```jsx
//index.js
import { NAME, sayHello } from "./modules.js";
//a.js
import { sayHello } from "./modules.js";
//b.js
import { NAME } from "./modules.js";
```

### 요약

- 순환 참조는 서로가 서로를 참조하는 형태입니다. (a모듈 ↔ b모듈)
- 순환 참조는 CommonJS 환경에서 쉽게 발견하지 못합니다.
- 내부적으로 모듈 평가 순서를 정의하는 파일을 따로 만들어 순환 참조 문제를 해결할 수 있습니다.

--

# 2. Cache-Control, Expires를 빠뜨리면 브라우저에서 무슨 일이 일어날까?

http 캐시를 적극적으로 설정하고 제어함으로써 웹 성능을 높일 수 있다는 사실이 있습니다.

현재 우리 프론트엔드 트랙에서 캐시 설정을 직접 다루지는 않습니다. 그렇지만 앞으로의 웹 성능과 이해를 위해 다양한 생명 주기를 가지는 캐시를 다루는 방법에 대해 아는것은 꼭 필요합니다.

그런데 브라우저 캐시 관련 헤더인 `Cache-Control` , `Exprires` 를 빠뜨리면 무슨 일이 일어나는지, 또한 브라우저 캐시 설정이 왜 중요한지 살펴보겠습니다.

## 웹 캐시

- 실제 작업을 하며 빌드된 사항이 적용이 안될때 `캐시 삭제해라` `강한 새로고침 해라` 등등의 말을 들은 적이 있을 겁니다.(cc. 최원빈님) 이것들도 브라우저 캐시와 관련된 사항이라고 볼 수 있죠.
- 클라이언트는 서버로부터 HTTP 요청을 통해 필요한 리소스 (HTML, CSS, JS, 이미지 등)를 불러옵니다. 네트워크를 통해 이 과정을 수행하는건 느리고 비용이 많이 듭니다.
- 여기서 발생할 수 있는 불필요한 네트워크 재요청을 방지하기 위해 웹 캐싱을 사용합니다.
- `Cache-Control` `Expries` 등과 같은 우리가 자주 봐온 헤더는 캐시 동작과 관련된 헤더로, 서버의 비용을 줄이고 클라이언트의 성능을 향상시키는 데 유용하게 사용됩니다.

### Cache-Control, Expires 헤더를 기입하지 않은 경우

- 누군가 의도했든 의도하지 않았든 `Cache-Control` `Expires` 헤더 모두 기입하지 않은 경우, 브라우저는 어떻게 동작할까요?
- 대표적인 브라우저인 크롬의 캐시 동작을 살펴보기 위해 Chromium의 코드를 확인해보았습니다.

```jsx
HttpResponseHeaders::GetFreshnessLifetimes(const Time& response_time) const {
  FreshnessLifetimes lifetimes;
  if (HasHeaderValue("cache-control", "no-cache") ||
      HasHeaderValue("cache-control", "no-store") ||
      HasHeaderValue("pragma", "no-cache")) {
    return lifetimes;
  }
...
if ((response_code_ == net::HTTP_OK ||
       response_code_ == net::HTTP_NON_AUTHORITATIVE_INFORMATION ||
       response_code_ == net::HTTP_PARTIAL_CONTENT) &&
      !must_revalidate) {
    // TODO(darin): Implement a smarter heuristic.
    Time last_modified_value;
    if (GetLastModifiedValue(&last_modified_value)) {
      // The last-modified value can be a date in the future!
      if (last_modified_value <= date_value) {
        lifetimes.freshness = (date_value - last_modified_value) / 10; //여기!
        return lifetimes;
      }
    }
  }
```

- Chromium의 `http_response_headers.cc` 를 살펴보니 freshness(유효성)이 `(date_value - last_modfied_value) / 10` 로 할당되는 것 같습니다.
- 이는 Date와 LastModified의 차이값의 10분의 1로 추정하여 유효성(freshness) 계산을 한다는 것입니다. [MDN 문서](https://developer.mozilla.org/ko/docs/Web/HTTP/Caching#%EC%9C%A0%ED%9A%A8%EC%84%B1_%EA%B2%80%EC%82%AC_%ED%9C%B4%EB%A6%AC%EC%8A%A4%ED%8B%B1)를 보니 `heuristic` 이라는 동작으로 캐시 헤더를 지정하지 않으면 **웹 스팩을 기반으로 대략적으로 캐시 작동을 합니다.**

### 그럼 캐시도 알아서 동작하니 문제가 없는걸까?

휴리스틱 캐시는 문제가 많이 생겨날 수 있습니다. 컨텐츠 배포를 했더라도 웹 배포후 특정 기기에서 이전 캐시 된 콘텐츠가 노출될 수 있고, 변경사항이 실제로 적용되는데 더 많은 시간이 걸릴 수 있습니다.

간단한 해결책으로는 사용자가 캐시를 비워 리소스를 새로 가져오도록 하는 것 입니다.

실제 개발자 창을 열고 새로고침 버튼을 우클릭하면 ‘캐시 비우기 및 강력 새로고침’ 을 선택할 수 있습니다.

![240329-002458](/posts/2024년%20하반기%20공유/240329-002458.png)

그러나 근본적으로 캐싱에 관한 문제가 발생하면 명시적으로 헤더를 설정하여 캐시 문제를 해결해주는게 좋다고 생각합니다. 캐시 유효시간을 사용하여 정확한 시간에 업데이트를 보장하는 방법을 써보면 좋을것같습니다.

실제 토스에서는 html은 배포 주기에 체크되어야 하는 리소스이기 때문에 `Cache-Control` 값으로 `max-age=0, s-maxage=31536000` 을 설정한다고 합니다. 그러나 JavaScript 나 CSS 파일은 프론트엔드 웹 서비스를 빌드할 때마다 새로 변경사항이 적용될 수 있도록 임의 버전 번호를 부여해 설정합니다.

⇒ 만약 토스의 캐시 설정에 대해 더 자세히 알고싶다면 [여기를 클릭](https://toss.tech/article/smart-web-service-cache)

## 요약

1. 브라우저 캐시 설정을 따로 하지 않을 경우 크롬, 사파리 등의 브라우저는 알아서 캐시 동작을 해줍니다.
2. 자동으로 캐시 설정이 된다는건 문제가 발생할 수 있는 지점이기 때문에 이를 확인해주는것이 중요합니다.
3. 각각의 특성에 따라 캐시를 섬세히 제어함으로 안전하고 빠르게 HTTP 리소스를 로드할 수 있으며, 트래픽 비용을 절감할 수 있습니다.

참고자료

- [https://web.dev/articles/http-cache](https://web.dev/articles/http-cache)
- [https://developer.mozilla.org/ko/docs/Web/HTTP/Caching](https://developer.mozilla.org/ko/docs/Web/HTTP/Caching)

ㅡㅡ

# 3. CI/CD가 협업에 필요한 이유

협업 경험이 부족했을 때는 작업한 내용을 한 분기에 통합하고 해당 작업이 배포될 때까지의 파이프라인을 수동으로 검증해야 했던 기억이 있습니다.

그러나 Github Action이라는 CI/CD 툴을 통해 협업 경험을 개선하면서, 브랜치를 병합하기 전 CI에서 테스트를 수행하고 배포 과정(CD)을 자동화할 수 있게 되었습니다.

### CI/CD 설명

CI/CD는 코드 변경 사항을 더 빠르고 안정적으로 제공하기 위해 빌드, 테스트 및 배포를 자동화하는 것을 의미합니다. 이는 지속적인 통합과 지속적인 배포로 이루어져 있으며, 각각의 정의는 다음과 같습니다.

- CI - 공유 저장소내에서 코드 변경 사항에 대한 빌드 및 테스트를 통합한다.
- CD - 변경 사항을 프로덕션 환경에 전달, 코드 변경 사항을 배포 자동화 한다.

따라서 CI/CD 파이프라인은 보통 두 가지 섹션으로 나뉘어 진행됩니다.

- build →test → artifact / staging → production

CI/CD 의 자세한 워크플로우 예시는 [여기](https://github.com/readme/guides/walking-the-walk-bringing-end-to-end-automation-and-testing-to-internal-teams)를 참고하면 좋을 것 같습니다.

###CI/CD의 이점

[Google DevOps 보고서](https://cloud.google.com/blog/products/devops-sre/the-2019-accelerate-state-of-devops-elite-performance-productivity-and-scaling?hl=en)에 따르면, CI/CD를 사용하는 조직은 다른 조직보다 배포를 208배 더 자주하고 리드 타임이 106배 더 빠르다고 합니다. 그 외의 이점으로는 다음과 같습니다.

- 코드베이스가 언제든지 안정적인 상태 유지
- 자동화되고 지속적인 테스트 가능 (비용 절감 효과)
- 릴리스 속도 단축
- 오류 격리, 장애 지점 감소
- 오버헤드 비용 절감

###팀에 도입되고있는 cicd 현황

저희 트랙에서는 Github Actions를 이용하여 CI/CD를 실행하고 있습니다.

Github Actions는 특정 리포지토리에서 트리거 이벤트가 발생할 때 GitHub Action Runner에서 작업을 실행하는 구조입니다.

Runner 머신 구축 이후, 리포지토리 `.github/workflows` 디렉토리에 워크플로우 YAML 파일을 작성하기만 하면 별도의 설치나 세팅 없이 사용할 수 있습니다.

현재까지 정의된 워크플로우는 다음과 같습니다.

1. Lint Check

코드 베이스의 안정성, 배포 과정에서의 에러를 최소화하기 위해 도입되었습니다. Pull Request가 등록되면 자동으로 eslint 테스트를 진행하고 eslint를 통과하지 못한 PR은 merge 하지 못하도록 제어됩니다.

1. Type Check

마찬가지로 코드 베이스의 안정성, 배포 과정에서의 에러를 최소화하기 위해 도입되었습니다. TypeScript 파일에 대해 타입 검사를 수행하고, 코드에 오류가 없는지 확인합니다. 이또한 테스트에서 오류가 발생하면 merge 할 수 없습니다.

1. Pick Reviewer

PR 리뷰어를 커스텀하기 위해 도입되었습니다. PR이 열리면 정해진 구성 안에서 랜덤으로 리뷰어가 배정되며, 이 과정은 슬랙으로 알림이 연동됩니다.

현재는 같은 도메인 팀 1명과 다른 도메인 팀 1명 구성으로 설정되어있습니다.

초기에는 PR Lint test 실행을 주목적으로 도입되었지만, 이 과정에서 Runner 머신 구축 뿐만 아니라 PR에 커밋이 추가될 때마다 중복 실행되거나, PR 본문이 변경되어도 린트 테스트가 실행되는 등 개선이 필요한 부분이 있었습니다.

따라서 Lint Test 이외의 개발 효율성을 높여줄 만 한 다양한 Action들을 찾았고, 검토해보면 좋을 것들을 모아봤습니다.

- develop 브랜치에 코드 변경 사항이 merge되는 즉시 자동으로 젠킨스 빌드 트리거
- 캐싱 데이터 활용하여 워크플로우 불필요한 작업 최적화
- 사용하지 않는 코드 자동 레거시 체크

요약

- CI/CD 전략은 소프트웨어 개발 라이프사이클 전반에서 효율성과 안정성을 증대시킵니다.
- 저희 팀에서는 Lint Check를 위주로 사용하고있지만, 더 효율적인 프로세스를 도입할 수 있습니다.

References
[CI/CD(CI CD, 지속적 통합/지속적 배포): 개념, 툴, 구축, 차이](https://www.redhat.com/ko/topics/devops/what-is-ci-cd)[CI/CD란?](https://seongwon.dev/DevOps/20220713-CICD%EB%9E%80/)

https://resources.github.com/ci-cd/

https://www.martinfowler.com/articles/originalContinuousIntegration.html

https://it.donga.com/101955/

[https://medium.com/naver-place-dev/github-actions를-활용한-개발-효율화-7df7a14b8843](https://medium.com/naver-place-dev/github-actions%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EA%B0%9C%EB%B0%9C-%ED%9A%A8%EC%9C%A8%ED%99%94-7df7a14b8843)

--
