---
title: "👾 antd를 활용한 upload component의 api request와 response의 타입 에러"
date: "2023-02-03"
---

### Summary

antd를 활용해 upload component를 만드는 과정에서 api request와 response의 타입 에러가 계속해서 발생하였음. form을 통해 제출해야하는 api `response` 타입과 직접 antd를 통해 set되는 value의 타입이 달라 문제가 생김. `http 501`, `http 400` 에러가 같이 생겨남

### Supporting data

- formData
  - formData는 규정상 원래 콘솔에서는 확인이 불가(network 의 payload도 마찬가지)
- file upload 로직
  - formData를 file api로 전달하고 파일 url변환
  - url을 post 배열에 담아 처리

### Incident Response Analysis

<u>api의 형식에 맞는 배열 따로, antd의 형식에 맞는 배열 따로 생성</u> 1. api 형식에 맞는 배열 따로 만들고 api에 PUT시키기 2. antd의 형식으로 변환한 배열을 따로 만들어 화면상의 렌더링전용(?)으로 사용하기
-> **타입에러 발생하지 X**

_-> 실제 코드_

- `form.getFieldValue()`를 통해 기존의 default값 할당
- 파일 업로드 전, `beforUpload()` 를 통해 각각의 파일을 `FormData`로 변환하고 uploadFileList에 추가
- `form.setFieldValue()`를 통해 form에 uploadFileList를 직접 할당

```typescript
const [uploadFileList, setUploadFileList] = useState<string[]>(
  form.getFieldValue(name) || []
);
const convertedFileList: UploadFile[] = uploadFileList?.map(convertUploadFile);

const handleUpload = (file: RcFile) => {
  const image = new FormData();
  image.append("multipartFile", file);

  uploadFile({ domain, image })
    .unwrap()
    .then((value) => {
      setUploadFileList([...uploadFileList, `https://${value.file_url}`]);
      form.setFieldValue(name, [
        ...uploadFileList,
        `https://${value.file_url}`,
      ]);
      message.success("업로드에 성공했습니다.");
    })
    .catch(() => {
      message.error("업로드에 실패했습니다.");
    });
  return true;
};
```

- `convertUploadFile()` hook을 통해 antd형식에 맞게 변환

```typescript
const convertUploadFile = (fileUrl: string, index: number): UploadFile => {
  return {
    uid: `${-(index + 1)}`,
    name: fileUrl,
    status: "done",
    url: fileUrl,
  };
};
```

### Post-Incident Analysis

- TypeError문제
  - api에 전체 데이터를 put할때의 image_url의 type은 `string`
  - antd를 통해 실제 담기는 filel의 type은 antd전용 객체인 `uploadFile`
  - image_url을 get할때는 `string[]` 이므로 fileList를 렌더링할때에 antd객체로 바꾸어야함.
  - 이와같은 api 에 GET, PUT 할때 서로 다른 data type으로 에러가 발생
- 파일 업로드 전용 api 에 대한 이해 부족
  - 파일 업로드 api에 requst방법과 response가 무엇인지 제대로 인지하지 못했음.
  - 파일 업로드 api는 formData를 받아 file의 전용url을 변환해주는 역할을 함.

### Timeline

![figure.1](https://github.com/hanagertrudekim/papers/blob/main/public/assets/blog/uploadComponent/1.png)

### Lessons Learned

- 에러 상태 확인
- api response, request type 확인
- 이용하는 라이브러리 parameter 공식문서 확인하기
