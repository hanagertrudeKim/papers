---
title: "💻 Github Action으로 데스크탑 앱을 자동으로 배포하는 방법"
date: "2023-11-30"
tag: 'Issue'
---


#### Motivation
pyqt6를 활용하여 개발한 python 데스크탑 앱을 배포하기까지 성공했다. 
pyinstaller라는 라이브러리를 이용해 하나의 실행 파일로 압축하여 배포했지만, 클라이언트 측에서 알수없는 오류들이 발생했고 이를 해결하기위한 방법을 모색했다.

우선, pyinstaller를 사용하여 앱을 패키징하는 과정은 나름의 불편함이 동반한다.
window의 경우 exe 파일, macOs의 경우 app 번들로 이루어진다. windows용 앱을 빌드하려면 windows에서 pyintstaller를 실행해야하며, mac용 앱을 빌드하려면 mac에서 pyinstaller를 실행해야한다. 

즉, 각 os의 실행 환경이 아니면 빌드할 수 없다. (테스트도 마찬가지다)
나는 mac m2를 메인 컴퓨터로 쓰고있기에 윈도우 패키징이 애매했고 결국, 예전에 쓰던 gram 14인치짜리를 들고다니며 앱을 빌드하고다녔다.

테스트의 한계를 넘어 mac의 다양한 환경(Intel 기반 등)에서 발생하는 오류를 잡지 못하게 되자, CI/CD(지속적 통합/배포) 방법을 도입해야겠다고 생각했다.

#### GitHub Action을 선택
클라우드 구축에는 여러 옵션이 있지만, github를 지속적으로 활용하고 배포하고있기에 GitHub Action을 선택하기로 결정했다. 
GitHub Action은 CI/CD 도구로 public 레파지토리라면 무료로 사용가능하다. Linux, Windows, MacOs를 실행하는 클라우드 시스템에서 실행될 워크플로를 정의할수있고,이는 다양한 플렛폼에서 구축해야하는 사례에 적합하다. (이게 당최 무슨말이냐 하면, github 에서 그냥 각각의 os 컴퓨터를 빌려주어서 이걸 바탕으로 앱을 빌드할수있다는 것이다.)


---

#### GitHub Action 시작하기

GItHub Actions를 시작하려면 앱 저장소에 다음과 같은 폴더를 만든다
```linux
mkdir -p .github/workflows/
```

그리고 build.yml 에 작업을 정의하는 파일을 추가한다. 
github action 이 build.yml을 읽어오면서 빌드해준다.

사용자가 원하는 순서대로 빌드 명령어를 알맞게 설정해주면 되는데, 나의 경우 pyinstaller로 각각의 os 에서 파일을 패키징해주도록 설정해주었다.

action 을 위해서 설정해보자면,

1. push :  push 이벤트에서 다음 작업이 실행되도록 정의한다.
   커밋에 'v'를 접두사로 사용하여 태그가 지정된 경우에만 해당되게 해주었다. 
```yml
name: Build

on:
  push:
    tags:
      - 'v*' # Push events to matching v*, i.e. v1.0, v20.15.10
```

2. createrrelease : github에서 새 release를 생성하는 작업을 담당한다. 

```yml

jobs:
  createrelease:
    name: Create Release
    runs-on: ubuntu-latest
    steps:
      - name: Create Release
        id: create_release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          draft: false
          prerelease: false
      - name: Output Release URL File
        run: echo "${{ steps.create_release.outputs.upload_url }}" > release_url.txt
      - name: Save Release URL File for publish
        uses: actions/upload-artifact@v1
        with:
          name: release_url
          path: release_url.txt
```


3. build : createrelease 작업이 완료된 후에 실행된다. strategy파트에서 두가지 버전을 정의할수이쓴데 MacOs와 WIndows 버전이다. 이 과정들은 조금더 세부적으로 볼수있는데,
	1. 각각의 시스템의 동작을 정의해준다.
	2. actions/checkout@v1 저장소가 클라우드 시스템에 복제된다.
	3. 저장소에서 requirements.txt 를 통해 종속성 문제를 해결해준다.
	4. 패키지는 pyinstaller를 사용하여 생성된다. 
	5. createrelease에서 작업한 realase url이 표함된 파일을 다운받는다
	6. 파일에서 release url 을 추출해 변수에 저장한다
	7. 그 release url 에 패키징 앱들을 업로드한다.

```yml
  build:
    name: Build packages
    needs: createrelease
    runs-on: ubuntu-latest
    strategy:
      matrix:
        include:
          - os: macos-latest
            TARGET: macos
            CMD_BUILD: |
              pyinstaller app.spec
              cd dist/ 
              zip -r9 DICOM_Anonymizer.zip DICOM_Anonymizer
              cd ../
            OUT_FILE_NAME: DICOM_Anonymizer.zip
            ASSET_MIME: application/zip
          - os: windows-latest
            TARGET: windows
            CMD_BUILD: pyinstaller app.spec
            OUT_FILE_NAME: DICOM_Anonymizer.exe
            ASSET_MIME: application/x-msdownload

    steps:
      - uses: actions/checkout@v1
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: 3.12
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt
      - name: Build with pyinstaller for ${{ matrix.TARGET }}
        run: ${{ matrix.CMD_BUILD }}
      - name: Download Release URL File
        uses: actions/download-artifact@v1
        with:
          name: release_url
      - name: Get Release File Name & Upload URL
        id: get_release_info
        shell: bash
        run: echo ::set-output name=upload_url::$(<release_url/release_url.txt)
      - name: Upload Release Asset
        id: upload-release-asset
        uses: actions/upload-release-asset@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          upload_url: ${{ steps.get_release_info.outputs.upload_url }}
          asset_path: ./dist/${{ matrix.OUT_FILE_NAME }}
          asset_name: ${{ matrix.OUT_FILE_NAME }}
          asset_content_type: ${{ matrix.ASSET_MIME }}

```




이렇게 설정하여 완성된 build.yml 은 다음과 같다.
```yaml
name: Build

on:
  push:
    tags:
      - 'v*' # Push events to matching v*, i.e. v1.0, v20.15.10

jobs:
  createrelease:
    name: Create Release
    runs-on: ubuntu-latest
    steps:
      - name: Create Release
        id: create_release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          draft: false
          prerelease: false
      - name: Save Release URL File
        run: echo "${{ steps.create_release.outputs.upload_url }}" > release_url.txt
      - name: Upload Release URL File
        uses: actions/upload-artifact@v1
        with:
          name: release_url
          path: release_url.txt

  build:
    name: Build packages
    needs: createrelease
    runs-on: ubuntu-latest
    strategy:
      matrix:
        include:
          - os: macos-latest
            TARGET: macos
            CMD_BUILD: |
              pyinstaller app.spec
              cd dist/ 
              zip -r9 DICOM_Anonymizer.zip DICOM_Anonymizer
              cd ../
            OUT_FILE_NAME: DICOM_Anonymizer.zip
            ASSET_MIME: application/zip
          - os: windows-latest
            TARGET: windows
            CMD_BUILD: pyinstaller app.spec
            OUT_FILE_NAME: DICOM_Anonymizer.exe
            ASSET_MIME: application/x-msdownload

    steps:
      - uses: actions/checkout@v1
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: 3.12
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt
      - name: Build with pyinstaller for ${{ matrix.TARGET }}
        run: ${{ matrix.CMD_BUILD }}
      - name: Download Release URL File
        uses: actions/download-artifact@v1
        with:
          name: release_url
      - name: Get Release File Name & Upload URL
        id: get_release_info
        shell: bash
        run: echo ::set-output name=upload_url::$(<release_url/release_url.txt)
      - name: Upload Release Asset
        id: upload-release-asset
        uses: actions/upload-release-asset@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          upload_url: ${{ steps.get_release_info.outputs.upload_url }}
          asset_path: ./dist/${{ matrix.OUT_FILE_NAME }}
          asset_name: ${{ matrix.OUT_FILE_NAME }}
          asset_content_type: ${{ matrix.ASSET_MIME }}

```

---

#### GitHub Action 실행하기

알수없는 permission 오류가 발생할수있는데, action 의 [permission 관련](https://github.com/orgs/community/discussions/60820) 하여  설정을 만져줘야한다.


![](https://i.imgur.com/XBxmp7A.png)


이와 같이 쓰기 읽기 권한을 부여해야 제대로 실행이 된다.

 또한, [GITHUB_TOKEN](https://docs.github.com/ko/actions/security-guides/automatic-token-authentication) 을 따로 설정해줘야한다고 생각했는데, 자동으로 생성된다고 한다. (이외의 토큰을 추가적으로 핸들링하려면, action 의 토큰 관련하여 설정을 해줘야한다. )
 
 이제 빌드 워크플로우를 실행시켜보자. 다음의 명령어를 쳐보면서 테스트할수있다.
```bash
git commit -a -m "add autostart enable and disable scripts to pypi"
git tag v0.4.5
git push
git push origin --tags
```


실제 action 탭에 들어가보면 build가 완료되었다고 알려준다.

![](https://i.imgur.com/s59gB4M.png)


설정한대로, release에까지 잘 업로드 되었다.

![](https://i.imgur.com/dUnwZ59.png)


나의 환경인 m2 에서 실행해보니, 맞지않는 exec 형식이라고 에러가 나는것을 확인했다.
mac m2 기준으로 나의 arch 는 arm64이고, m1과 m2 에 탑재되는 apple silicon을 지원하는 모델이 최근 2023년 10월에 정식 출시되었다고 한다. 
참고 : ([Introducing the new, Apple silicon powered M1 macOS larger runner for GitHub Actions - The GitHub Blog](https://github.blog/2023-10-02-introducing-the-new-apple-silicon-powered-m1-macos-larger-runner-for-github-actions/))


그러므로 m1, m2 에 지원가능한 형태로 모두 수정해줘야할것같다.

****



#### Conclusion
결론적으로 통합된 개발 환경과 유지보수를 위해서는 CI/CD를 도입하는것이 도움이 된다.
다양한 os에 맞추어 빌드를 할수있고, 실제 나의 로컬 디렉토리를 거치지 않고도 빌드가 가능하다는 점이 편리하다. 또한, 통합되고 안정된 환경에서 빌드를 진행하기에 오류가 날 확률도 적어진다는 이점도 있는것같다.
추후 테스트를 거치며, 다양한 버전을 추가해야할것같다.



** cc sorce
[Build a multi OS Python app in the cloud: PyInstaller on GitHub Actions - Data-Dive](https://data-dive.com/multi-os-deployment-in-cloud-using-pyinstaller-and-github-actions/)
[GitHub 호스팅 실행기 정보 - GitHub Docs](https://docs.github.com/ko/actions/using-github-hosted-runners/about-github-hosted-runners/about-github-hosted-runners#github-%ED%98%B8%EC%8A%A4%ED%8C%85-%EC%8B%A4%ED%96%89%EA%B8%B0%EC%9A%A9-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%ED%98%B8%EC%8A%A4%ED%8A%B8)
