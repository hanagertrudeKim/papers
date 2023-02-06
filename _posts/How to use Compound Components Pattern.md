
---
title: 'How to use Compound Components Pattern'
date: '2023/02/06'
---

## Compound Components Pattern

- 조합 컴포넌트 패턴이란
	- 하나의 컴포넌트를 여러 가지 집합체로 분리한 뒤, 분리된 각 컴포넌트를 사용하는 쪽에서 조합해 사용하는 컴포넌트 패턴
	- props drilling으로 인해 발생하는 문제를 해결하는 하나의 대안책이 될수있다.
		-  prop drilling이란
		- react 컴포넌트 트리에서 하위 컴포넌트로 데이터를 전달하기 위한 방법
		- 전역변수를 설정하는대신 prop drilling을 사용하면 
			- 수정할때 코드를 따라 추적하기가 쉽고
				- 보다 명시적으로 데이터를 주고받을수있다.
			- 하지만 prop drilling 이 일으킬수있는 문제도 존재
				- 요구 사항이 복잡해지고 더 다양한 상황들을 고려해야할때, 이에 따라 컴포넌트의 계층이 복잡해진다면
				- 부모 컴포넌트에서 전달해야하는 props 또한 많아질것이다.
					- 이는 상태관리가 복잡해지고
					- 유지보수가 힘들어지고
					- 필요보다 많거나, 내지는 필요없는 props를 전달할수도 있음
			-  => 시기에 적절히 판단하여 사용해야한다.
	- 조합 컴포넌트를 통해 관심사를 분리할수있음
		- 한가지의 기능을 책임지는 컴포넌트 조각들로 나눌수있음
		- 이들을 조합해 사용함으로써 의미론적인 결과를 만들어냄 
	- 복잡성을 해결해줌
		- 직관적으로 파악하기 쉬워 가독성을 개선함
		- 변화에 유연하게 대처할수있다.

## Compound Form Components

- Compound Form Component
	- 기본적으로 재사용 가능한 컴포넌트에 근거해야한다.
		- form의 입력되는 데이터간의 의존성을 낮춘다.
			- 어떤 데이터가 들어오든지 그에 근거하지않고 처리할수있다.
		- 의존성을 낮추면 도메인과의 결합도가 낮아지기 때문에 
		- 범용적으로 form이 필요한 모든곳에 custom해 사용할수있게된다.
	- Form Component의 경우 책임을 form의 기능, 죵류에 따라 나눌수있다.
		- 적절한 컴포넌트 단위로 나누는것이 중요한데,
		- 이또한 사용하는 라이브러리 툴에 따라 달라질수있다.
		- 현재 사용하는 [ant design](https://ant.design/) 를 사용한다면
			- input
			- text area
			- checkbox
			- button
			- select
			- upload
			- modal
		- 등 UI 단위로 나눌수있다.


### 구현

- 서브 컴포넌트 구현
	- antd의 UI를 기준으로 컴포넌트를 만들어낸다.

- input component 
```jsx
function CustomInput({
  label, name, rules, disabled, ...args
}: FormItemProps & InputProps) {
  return (
    <S.FormItem label={label} name={name} rules={rules}>
      <S.StyledInput disabled={disabled} {...args} />
    </S.FormItem>
  );
}
```

- checkbox component
```jsx
function CustomCheckbox({
  name,
  children,
  disabled,
}: CheckboxProps) {
  return (
    <S.FormItemCheckbox name={name} valuePropName="checked">
      <Checkbox disabled={disabled}>
        {children}
      </Checkbox>
    </S.FormItemCheckbox>
  );
}
```

- button component
```jsx
function CustomButton({
  children,
  danger,
  icon,
  onClick,
  htmlType,
}: ButtonProps) {
  return (
    <S.FormItem>
      <S.StyledButton
        htmlType={htmlType}
        type="primary"
        danger={danger}
        icon={icon}
        onClick={onClick}
      >
        {children}
      </S.StyledButton>
    </S.FormItem>
  );
}
```

- 서브컴포넌트를 묶어 export 하기
	- 서브 컴포넌트들을 CutomForm의 객체로 지정해주어 export 한다.
	- 각각의 컴포넌트가 CustomForm으로 통일되기때문에 가독성에도 도움을 줄수있다.
```jsx 
//exapmle

const CustomForm = Object.assign(Form, {
  GridRow,
  Button: CustomButton,
  Input: CustomInput,
  InputNumber: CustomInputNumber,
  TextArea: CusctomTextArea,
  MultipleUpload: CustomMultipleUpload,
  SingleUpload: CustomSingleUpload,
  Checkbox: CustomCheckbox,
  Select: CustomSelect,
  Switch: CustomSwitch,
  Modal: CustomModal,
});

export default CustomForm;
```


- Usage
	- 직관적으로 `CustomForm` 으로 통일되어 일관성있게 짤수잇음
	- 중간에 추가를 해야한다면 추가하기에 용이함.
```jsx
<CustomForm>
      <CustomForm.Input label="방이름" name="name" />
      <CustomForm.GridRow gridColumns="1fr 1fr">
        <CustomForm.Input label="방종류" name="room_type" />
        <CustomForm.InputNumber label="방크기" name="size" />
      </CustomForm.GridRow>
      <CustomForm.GridRow gridColumns="1fr 1fr">
        <CustomForm.InputNumber label="위도" name="latitude" />
        <CustomForm.InputNumber label="경도" name="longitude" />
      </CustomForm.GridRow>
      <CustomForm.Input label="주소" name="address" />
      <CustomForm.TextArea
        label="설명"
        name="description"
        maxLength={200}
      />
      
      <Divider orientation="left" style={{ marginTop: '40px' }}>
        옵션
      </Divider>
      <S.CheckboxWrap>
        {ROOM_OPTION.map(
          (optionData) => (
            <CustomForm.Checkbox
              key={optionData.name}
              name={optionData.data}
            >
              {optionData.name}
            </CustomForm.Checkbox>
          ),
        )}
      </S.CheckboxWrap>
  
      <Divider orientation="left">사진</Divider>
      <S.UploadWrap>
        <CustomForm.MultipleUpload domain="lands" name="image_urls" form={form} />
      </S.UploadWrap>
      <CustomForm.Button icon={<UploadOutlined />} htmlType="submit">
        완료
      </CustomForm.Button>
      <CustomForm.Button danger icon={<DeleteOutlined />} onClick={deleteRoom}>
        삭제
      </CustomForm.Button>
    </CustomForm>
```


### conclusion

- **함성 컴포넌트 패턴**을 이용하면
	- 재사용성을 극대화할수있다.
	- 보다 유연성이 높은 컴포넌트를 만들어낼수있다.


### Reference
- [fe-developers.kakaoent.com/2022/220731-composition-component](https://fe-developers.kakaoent.com/2022/220731-composition-component/#:~:text=%ED%95%A9%EC%84%B1%20%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%20%ED%8C%A8%ED%84%B4%EC%9D%80%20%ED%95%98%EB%82%98,%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%20%ED%8C%A8%ED%84%B4%EC%9D%84%20%EC%9D%98%EB%AF%B8%ED%95%A9%EB%8B%88%EB%8B%A4.)
- [patterns.dev/posts/compound-pattern](https://www.patterns.dev/posts/compound-pattern/)
- [kentcdodds.com/blog/compound-components-with-react-hooks](https://kentcdodds.com/blog/compound-components-with-react-hooks)
