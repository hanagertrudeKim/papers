---
title: "💻 2024년 하반기 공유 2"
date: "2024-04-01"
tag: "DeepDive"
---

# 1. MOCKING TOOL로 생산성 챙기기

모킹(Mocking)이란 단위 테스트 작성할 때, 해당 코드가 의존하는 부분을 가짜(mock)로 대체하는 기법입니다.

개발을 진행할때 백엔드에서 API가 완성되지 않아 난처했던 적이 있었을 것입니다.

특정 상황의 개발되지 않은 부분에 의존하여 개발을 진행하게 된다면 다음과 같은 문제를 야기할 수 있습니다.

1. 개발되지 않은 모듈에 의존하면 테스팅이 어려움
2. 다른 모듈에 의해 테스트 결과가 바뀔수있고, 테스트 실행 속도가 떨어짐
3. 프로젝트 규모가 커져서 테스트 케이크가 많아질 경우 큰 이슈가 야기될 수 있음

이러한 상황에서 실제 모듈을 모방한 가짜 모듈을 생성하는 mocking 이 필요하게 되며, 실제로 프로젝트를 진행하면서도 mocking 하는 행위가 빠른 개발과 안정성에 도움을 줄 수 있습니다.

프론트엔드에서 백엔드 모킹이 필요한 상황은 다양합니다.

예를 들어, 백엔드 API가 아직 개발 중이거나, 원하는 형태의 데이터나 응답을 테스트해야 할 때, 또는 서버 에러 상황을 테스트하고 싶을 때 등이 있습니다.

이 상황에서의 솔루션은 대표적으로 세가지로 나눠볼 수 있는데,

1. 백엔드 작업이 완료될때까지 기다린다.
2. 애플리케이션 내부 로직에 직접 Mocking 한다. ([참고](https://velog.io/@jsw4215/%EB%A6%AC%EC%95%A1%ED%8A%B8-Mock-API) : **public** **folder**와 **.json** 파일 등을 이용하여 mocking )
3. 페이크 API를 제공하는 라이브러리를 사용한다.

현실적으로 시간이 많다면 1번을 지향하겠지만, 시간이 부족하거나 리소스가 부족할 경우에는 3번을 선택하게 됩니다.

실제로 쩝쩝박사 프로젝트에서는 Google API 할당량 부족으로 인해 개발 환경 테스트를 위해 3번 방법을 채택했습니다.

따라서 이와 관련하여 주로 사용되는 툴들을 소개합니다.

## Json Placeholder

[JSONPlaceholder - Free Fake REST API](https://jsonplaceholder.typicode.com/)

Json Placeholder는 프로토타입 또는 개발 테스트를 위한 페이크 JSON API를 제공합니다.

6개 유형의 리소스를 제공하며, CRUD 테스트를 위한 모든 HTTP 메서드를 지원합니다.

GET, POST, PUT, PATCH, DELETE 메소드를 모두 테스트 할 수 있으며 게시물, 사진 등과 같은 데이터들도 다룰수 있게 되어있습니다.

간략한 사용 예시는 다음과 같습니다.

```jsx
// 요청 예시
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json())
  .then((json) => console.log(json));
```

Json Placeholder를 이용하면 빠른 속도로 테스트할 수 있지만, 응답값을 커스텀하는 것이 어려운 단점이 있습니다.

## **MSW(Mock Service Worker)**

[Mock Service Worker](https://mswjs.io/)

MSW(Mock Service Worker)는 Service Worker를 이용해 서버를 향한 실제 네트워크 요청을 가로채서(intercept) 모의 응답(Mocked response)를 보내주는 API Mocking 라이브러리입니다. 실제 API를 사용하는 것과 유사하게 네트워크 수준에서 Mocking할 수 있습니다.

사용 예시로 POST 메서드의 /login 요청을 만들어보면 다음과 같이 API를 직접 정의할 수 있습니다.

```jsx
/ src/mocks.js
import { setupWorker, rest } from 'msw'

const worker = setupWorker(
  rest.post('/login', (req, res, ctx) => {
    const isAuthenticated = sessionStorage.getItem('username')

    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authenticated',
        }),
      )
    }
    return res(
      ctx.json({firstName: 'John'}),
    )
  }),
)

// Register the Service Worker and enable the mocking
worker.start()
```

이런식으로 상태 코드와 에러 메시지, 반환 값들을 커스텀 할 수 있으며 여러 옵션들을 세부적으로 적용할 수 있다.
(실제 API 처럼 정말 다양하게 커스텀 할 수 있다)

하지만 설정 비용이 비교적 많이 들고, 간단한 응답 테스트를 위해서는 다소 번거로울 수 있습니다.

### conclusion

- FE 환경의 빠른 개발을 위한다면 백엔드 모킹이 필요하다.
- Json Placeholder는 간단한 응답 테스트에 적합하며, MSW는 더욱 복잡한 상황에서 커스터마이징이 가능하다.

reference

https://tech.kakao.com/2021/09/29/mocking-fe/

https://developer.mozilla.org/ko/docs/Web/API/Service_Worker_API

https://www.daleseo.com/mock-service-worker/#google_vignette

--

# 2. 로딩 시간에 따른 다른 사용자 경험 처리

프로그래스 바나 로딩 스피너와 같은 UI 요소는 사용자가 현재 작업 상태를 파악하고 불확실성을 줄여주어 프로세스를 더 쉽게 이해할 수 있도록 도와줍니다. 이로써 사용자는 더욱 만족스러운 경험을 할 수 있게 됩니다.

저희 서비스에서도 데이터 Fetching 시 걸리는 시간을 보여주기 위해 Suspense를 사용하고 있습니다. 하지만 이러한 방법이 실제로 사용자 경험을 향상시키고 있는지 의문입니다.

##Progress Indicator 에 관한 리서치

세계적인 UX 연구자 닐슨 놀먼의 지침을 살펴보면 다음과 같습니다.

- **1초 이상 걸리는 작업에는 Progress Indicator를 사용합니다. 작업이 1초 미만에 완료되는 경우 반복되는 애니메이션은 사용하지 않는 것이 좋습니다.**
- 로딩 스피너와 같은 요소는 2~9초의 지연 시에만 사용합니다.
- 완료율 애니메이션은 10초 이상 소요되는 작업에 사용합니다.
- 빠른 응답이 가장 이상적이지만, 서버 업그레이드로 인해 시스템 속도가 느려질 수 있습니다. 따라서 작업이 10초 이상 소요될 경우 사용자에게 완료 예상 시간을 표시해야 합니다.
- 정적인 진행률 표시는 피하는 것이 좋습니다. (예: 화면에 단순히 "...로드 중" 텍스트만 표시)

이러한 지침을 고려하면 로딩 시간에 따라 다른 로딩 경험을 제공하는 것이 바람직합니다.

또한, 모든 경우가 아닌 1초 이상 지연될 경우에만 로딩 스피너를 사용하는 것이 좋습니다.

##React Suspense 를 이용하여 로딩 경험 개선

현재 저희는 대부분의 경우 Suspense를 이용하여 child component를 감싸 로딩 스피너를 보여주고 있습니다.

```tsx
// example
<div className={styles.page__depart}>
  <React.Suspense fallback={<LoadingSpinner />}>
    <DeptListbox />
  </React.Suspense>
</div>
```

이를 로딩 시간에 따라 다른 UX를 제공할 수 있도록 유틸성 컴포넌트를 활용해 변경할 수 있습니다.

예를 들어, 1초까지는 아무런 UX를 제공하지 않다가 1초 이상 로딩이 지연된다면 그때 로딩 스피너를 보여주는 컴포넌트를 만들 수 있습니다. 아래는 카카오에서 제시한 유틸 컴포넌트 설계입니다.

```tsx
const DeferredComponent = ({ children }: PropsWithChildren<{}>) => {
  const [isDeferred, setIsDeferred] = useState(false);

  useEffect(() => {
    // 200ms 지난 후 children Render
    const timeoutId = setTimeout(() => {
      setIsDeferred(true);
    }, 200);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!isDeferred) {
    return null;
  }

  return <>{children}</>;
};
```

**`DeferredComponent`**는 children을 Props로 받고, 200ms 이전에는 children을 렌더링하지 않습니다.

따라서 기존의 로딩 스피너에 이 **`DeferredComponent`**를 적용하면 특정 시점부터 로딩 스피너가 보여지게 됩니다.

```tsx
<div className={styles.page__depart}>
  <React.Suspense
    fallback={
      <DeferredComponent>
        <LoadingSpinner />
      </DeferredComponent>
    }
  >
    <DeptListbox />
  </React.Suspense>
</div>
```

우리는 사용자 경험을 향상시키기 위해 항상 Progress Indicator(=Skeleton)을 사용하고 있습니다. 그러나 빠른 인터넷 환경에서는 오히려 선택적으로 Progress Indicator를 제공하는 것이 더 나은 사용자 경험을 제공할 수 있습니다.

resource

- https://tech.kakaopay.com/post/skeleton-ui-idea/
- https://www.nngroup.com/articles/progress-indicators/

--

# 3. Web vital 최적화를 위한 tip

웹 성능 최적화는 사용자 경험을 향상시키는 주요 요소로, 서비스 관점에서도 중요한 역할을 합니다. 로딩 속도가 느릴수록 사용자는 웹사이트를 떠날 가능성이 높아지는데, 0.1초의 성능 개선도 conversion rate를 높일 수 있습니다.

주로 LCP, FID, INP와 같은 web vitals로 측정되며, 이러한 지표는 사용자의 첫 반응을 기준으로 합니다. (최근에는 이를 개선하기 위해 INP가 도입되었는데, 이는 모든 입력 지연 시간의 평균을 측정하는 등 더 나은 측정이 가능하게 합니다.)

이러한 web vitals 를 어떻게 개선할 수 있는지, 여러가지 팁들을 정리해봤습니다.

## **LCP 최적화**

1. LCP 자원이 HTML 내에서 빨리 찾아져야 합니다.
2. LCP 자원이 우선시되어 다운로드될 수 있도록 해야 합니다.
3. CDN을 사용하여 돈을 투자합니다.
   - 사용자가 가장 가까운 서버에서 데이터를 전달받을 수 있도록 합니다.
   - 물리적으로 최대한 가까운 서버를 활용합니다.

**실제 사례:**

- 이미지는 **`<img>`** 엘리먼트에 넣고 `src`나 `srcset` 속성을 이용하여 첫 번째 렌더링 시 필요한 이미지를 알려줍니다.
- SSR을 사용합니다.
- 내부에서 호스팅하지 않는 이미지에는 **`<link rel="preload">`** 태그를 사용하여 브라우저에게 빨리 로드해야 하는 소스임을 알려줍니다.
- **`<img>`** 태그에 **`fetchpriority="high"`** 속성을 추가하여 LCP 이미지를 우선적으로 브라우저가 다운로드하게 합니다.
- **`<img>`** 엘리먼트에 **`loading="lazy"`** 속성을 추가하여 LCP 가 아닌 이미지를 나중에 로딩할 수 있도록 합니다.

## **CLS 최적화**

- 컨텐츠의 명확한 사이즈를 설정합니다.
- 흔들리는 CSS 애니메이션 및 전환 효과를 지양합니다.
- bfcache를 사용하여 캐싱을 최적화합니다.
  - 모든 지표를 향상시킬 수 있는 도구입니다.
  - 이를 위해 캐싱을 막아놓지 않았는지 확인합니다.

**실제 사례:**

- `width`와 `height`를 명시적으로 지정합니다.
- `aspect-ratio`를 사용하여 `width`만 지정하고 `height`를 유동적으로 설정합니다.
- `min-height`를 지정하여 요소가 덜 밀리도록 방지합니다.

## **FID 최적화**

- 긴 작업을 작게 분할합니다.
- 불필요한 자바스크립트 코드를 최소화합니다.
- 큰 렌더링 업데이트를 피합니다.
  - 부분적으로만 업데이트합니다.

**실제 사례:**

- 긴 작업을 작게 분할합니다.
  - webpack과 같은 도구를 사용하여 chunking이 가능하게 합니다.
- 메인 쓰레드에서 잠시 자원을 양보합니다.
- coverage 도구를 활용합니다.
- 코드를 분할합니다.
- 불필요한 트래킹 태그를 제거합니다.
- **`requestAnimationFrame()`** 사용을 지양하고 DOM 크기를 최소화합니다.

reference

https://web.dev/articles/vitals

[23년 6월 Tech 세미나 - 웹 프론트엔드 성능 최적화 방법 및 적용 사례](https://www.youtube.com/watch?v=BEwv4to9OWY)

--

# 4. 재미와 이익을 위한 자바스크립트 전문화

[https://velog.io/@surim014/optimizing-javascript-for-fun-and-for-profit#9-전문화specialization-사용하기](https://velog.io/@surim014/optimizing-javascript-for-fun-and-for-profit#9-%EC%A0%84%EB%AC%B8%ED%99%94specialization-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
이 글은 JavaScript 최적화 방법에 대한 내용을 소개합니다.

이중에서 9번 챕터인 전문화(specialization) 에 관련해 흥미롭게 느낀 부분을 중심으로 설명하겠습니다. 이외의 내용이 궁금하신 분들은 위 글의 나머지 챕터들을 읽어보시기 바랍니다.

### 전문화

전문화는 특정 사용 사례의 제약 조건을 로직에 맞추는 것입니다.

일반적으로 한 조건이 다른 조건보다 더 자주 발생한다고 판단될 때, 이를 파악하고 해당 조건에 맞게 코드를 작성할 수 있습니다.

예를 들어, 어떤 제품 목록에 태그를 추가해야 하는 상황에서, 태그가 대부분 비어있다는 것을 알게 되었다고 가정해보겠습니다.

따라서 이 상황에 맞추어 전문화를 적용하고 이에 대해 설명하겠습니다.

다음과 같이 예시 물품과 태그를 정의합니다.

```tsx
const descriptions = ["apples", "oranges", "bananas", "seven"];
const someTags = {
  apples: "::promotion::",
};
const noTags = {};
```

그런 다음, 전문화를 적용하지 않은 문자열 변환 함수를 살펴보겠습니다.

```tsx
// 해당되는 경우 태그와 함께 제품을 문자열로 전환합니다.
function productsToString(description, tags) {
  let result = "";
  description.forEach((product) => {
    result += product;
    if (tags[product]) result += tags[product];
    result += ", ";
  });
  return result;
}
```

이와 다르게 빈태그를 먼저 걸러주는 전문화가 적용된 동일한 기능 함수를 만들어줍니다.

```tsx
function productsToStringSpecialized(description, tags) {
  // 우리는 `tags`가 비어 있을 가능성이 있다는 것을 알고 있으므로 미리 한 번 확인한 다음 내부 루프에서 `if` 검사를 제거할 수 있습니다.
  if (isEmpty(tags)) {
    let result = "";
    description.forEach((product) => {
      result += product + ", ";
    });
    return result;
  } else {
    // 문자열 전환 로직은 동일
  }
}
function isEmpty(o) {
  for (let _ in o) {
    return false;
  }
  return true;
}
```

이 두개의 함수를 가지고 실제 비교했을 때의 수치 비교는 다음과 같이 나타납니다.

- non speciailized : 85.71 %
- specialized : 100 %

위와 같은 상황에서는 다음과 같은 알고리즘 적용을 통해 성능이 더 높아질 수는 있지만, 조건이 달라진다면 다르게 판단해야 할 필요가 있을것입니다.

(코드에서의 분기 측변에서도 제거하는게 더 효율적이다 라는 이면이 있기에.. [대표 예시](https://stackoverflow.com/questions/11227809/why-is-processing-a-sorted-array-faster-than-processing-an-unsorted-array))

reference : [https://velog.io/@surim014/optimizing-javascript-for-fun-and-for-profit#9-전문화specialization-사용하기](https://velog.io/@surim014/optimizing-javascript-for-fun-and-for-profit#9-%EC%A0%84%EB%AC%B8%ED%99%94specialization-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)

https://stackoverflow.com/questions/11227809/why-is-processing-a-sorted-array-faster-than-processing-an-unsorted-array

--

# 5. 시간 단축을 위한 Tailwind 사용기

Tailwind는 최근 웹 분야에서 인기를 끌고있는 CSS 프레임워크입니다.

하지만 개발자들 사이에서도 호불호가 많이 갈리는 편이며, 여러 논쟁이 오가는 핫포테이토로 여겨집니다.

Tailwind가 왜 차세대 css 프레임워크로 떴는지 알아보고, 저의 지극히 주관적인 리뷰도 간단히 적어보려합니다.

## Tailwind?

Tailwind는 많은 유틸리티(utility) 클래스로 이루어진 CSS 프레임워크입니다.

유틸리티 클래스란 한가지 일만 하는 매우 적은 양의 css 코드를 담고 있는 클래스라고 생각하면 되는데, 실제 tailwind 로 코드를 작성하고 크롬 inspector로 선택해보면, 각 스타일에 한 클래스가 할당되어 있는 것을 확인할 수 있습니다.

보통의 css 코드를 작성하려면 css 파일을 분리하거나 인라인 요소로 직접 작성하게 됩니다.

러나 Tailwind를 사용하면 HTML 요소의 **`class`** 속성에 유틸리티 클래스를 추가하는 것만으로 스타일링이 가능합니다. (Tailwind의 PostCSS 플러그인으로 동작한다고 합니다)

따라서 다음과 같이 Tailwind 코드를 작성한다고 가정하면,

```tsx
<button class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600">
  Primary
</button>
```

다음과 같은 css 클래스들이 합쳐지게 됩니다.

```tsx
.rounded {
  border-radius: 0.25rem;
}

.bg-blue-500 {
  background-color: rgb(59 130 246);
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

...
```

## 다른 CSS 프레임워크와의 비교

대표적인 Bootstrap 이나 Mererial UI 등과는 다르게 Tailwind가 가진 강점은 무엇일까요?

Bootstrap같은 프레임워크는 `<button class="btn btn-primary">` 한줄이면 위의 UI 와 동일하게 구현해낼 수 있습니다. 그러나, 세부적인 CSS 수정이 불가하거나 불편해집니다.

따라서 Tailwind는 더 많은 클래스를 사용하고 배워야 한다는 단점이 있지만, 다른 측면으로 보면 엄청난 유연성과 확장성을 제공한다고 볼 수 있습니다.

다양한 CSS 라이브러리를 써본 저로서는 이 부분이 많이 공감되는 부분입니다.

## Tailwind를 둘러싼 치열한 논쟁

트위터같은곳에서는 Tailwind를 좋아하는 부류와 싫어하는 부류가 끝없는 논쟁을.. 한다고 합니다.

Tailwind를 좋아하는 개발자들은 생산성 측면, 빠르게 디자인을 구현하게 도와준다는 점을 강조합니다. 또한 변경이나 수정이 쉬워서 유지보수가 잘 된다고 말합니다. 한 번 Tailwind를 써보면 다시는 기존으로 돌아가지 못한다는 강력한 찬성의 의견도 보였습니다.

반면, Tailwind를 싫어하는 개발자들은 유틸리티 클래스를 과도하게 사용하는것이 가독성이 떨어지며 오히려 유지 보수성이 낮아진다고 주장합니다. 또한 과도하게 Tailwind를 학습할 경우, css 바보가 될거라는 경고도 존재했습니다. (하지만, Tailwind를 사용해보지 않은 사람들이 이런 말을 한다는 속설도 있습니다.)

## 나의 주관적인 리뷰

최근 진행한 프로젝트에서 Tailwind를 처음부터 도입해 사용해보았는데, 저의 주관적인 장단점을 리뷰해보겠습니다.

### 장점

- 매우 빠른 CSS 작성이 가능하다 (기존 UI 작업 시간의 효율을 약 70% 정도 올렸다고 생각).
- 다른 CSS 프레임워크보다 자유도가 높고, 수정이 용이하다.
- 컴포넌트의 CSS 파일을 따로 찾지 않아도 되어 간편하다.
- 모바일 반응형 적용이 편리하다 (**`sm:flex`**와 같이 작성하면 작은 화면에서 flex가 적용됨).

### 단점

- 적용할 CSS 요소가 많을 경우, 인라인 코드가 엄청 길어진다.
- 많은 양의 HTML 요소와 CSS를 한꺼번에 보면 가독성이 떨어진다.
- [\*\*Vendor Prefixes](https://tailwindcss.com/docs/browser-support#vendor-prefixes)\*\* 를 사용하려면 추가적인 라이브러리를 install 해야한다.

## 마치며

사실 어떤 라이브러리를 도입할지 결정할 때에는 많은 고려사항을 따져봐야 합니다. 그럼에도 가장 중요한 것은 외부적인 요인(인지도, 커뮤니티 의견)에 휩쓸리지 말고 자신의 프로젝트에 적합한 도구인지 판단하는 것이라고 생각이 듭니다.

reference

https://tailwindcss.com/

https://tailwindcss.com/docs/browser-support#vendor-prefixes

https://kulkarniankita.com/newsletter/tailwind-vs-css-the-twitter-drama-

https://www.daleseo.com/tailwind/
