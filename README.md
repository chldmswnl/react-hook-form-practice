# react-hook-form 사용해보기

### 필드 소개 및 조건

#### 이름

- 필수
- 유효성 검사 필요

#### 연락처

- 필수
- 유효성 검사 필요

#### 성별

- 필수
- 유효성 검사 필요

#### 특이사항

- 필수아님

## 이전 코드

- form 태그 사용하지 않음 (웹 접근성 문제발생)
- 공통 컴포넌트 + 커스텀 훅 조합
- 유효성 검사는 커스텀 훅에서 진행

```tsx
return (
  <FormSection>
    <Input
      label="성명"
      error={nameError}
      errorMessage="올바른 성명을 입력해주세요"
      value={info.name}
      onChange={({ target }) => handleChange("name", target.value)}
    />
    <Input
      label="연락처"
      error={phoneError}
      errorMessage="올바른 휴대폰 번호를 입력해주세요"
      value={phone}
      onChange={({ target }) => setPhone(target.value)}
    />
    <Select
      label="성별"
      options={GENDER_OPTIONS}
      value={info.gender}
      onChange={({ target }) => handleChange("gender", target.value)}
    />
    <Textarea
      label="특이사항"
      value={info.note}
      onChange={({ target }) => handleChange("note", target.value)}
      maxLength={500}
    />
    <Button onClick={handleRegisterBtnClick}>등록하기</Button>
  </FormSection>
);
```

## 이후 코드

### 뼈대만들기

react-hook-form의 중요 컨셉 중 하나로 hook에 컴포넌트를 '등록'(register)하는 것이다. 그렇게 하면 유효성 검사와 제출 모두에 해당 값을 사용할 수 있다.

```tsx
const { register, handleSubmit } = useForm<Info>();
const onSubmit: SubmitHandler<Info> = (data) => {
  console.log(data);
};

return (
  <FormSection onSubmit={handleSubmit(onSubmit)}>
    <label>이름</label>
    <input {...register("name")} />
    <label>핸드폰</label>
    <input {...register("phone")} type="tel" />
    <label>성별</label>
    <select {...register("gender")}>
      {GENDER_OPTIONS.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
    <label>특이사항</label>
    <textarea {...register("note")} />
    <Button>등록하기</Button>
  </FormSection>
);
```

### 유효성 검사 추가하기

register함수의 두번째 인자로 유효성 검사 조건을 추가할 수 있다. react-hook-form이 지원하는 유효성 검사는 HTML 표준을 따르는데 아래와 같다.

- required
- min
- max
- minLength
- maxLength
- pattern
- validate

```tsx
return (
  <FormSection onSubmit={handleSubmit(onSubmit)}>
    <label>이름</label>
    <input
      {...register("name", {
        required: true,
        minLength: 1,
        maxLength: 50,
        pattern: /^[가-힣a-zA-Z]+(?:\s[가-힣a-zA-Z]+)*$/,
      })}
    />
    <label>핸드폰</label>
    <input
      {...register("phone", {
        required: true,
        pattern: /^(\d{3})-(\d{3,4})-(\d{4})$/,
      })}
      type="tel"
    />
    <label>성별</label>
    <select {...register("gender", { required: true })}>
      {GENDER_OPTIONS.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
    <label>특이사항</label>
    <textarea {...register("note", { minLength: 0, maxLength: 500 })} />
    <Button>등록하기</Button>
  </FormSection>
);
```

### 에러 메세지 추가하기

```tsx
return (
  <FormSection onSubmit={handleSubmit(onSubmit)}>
    <label>이름</label>
    <input
      {...register("name", {
        required: { value: true, message: "이름은 필수값입니다." },
        maxLength: { value: 50, message: "이름은 1자이상 50자 이하입니다." },
        pattern: {
          value: /^[가-힣a-zA-Z]+(?:\s[가-힣a-zA-Z]+)*$/,
          message: "알맞지 않은 이름 형식입니다.",
        },
      })}
    />
    {errors.name && <span>{errors.name.message}</span>}
    <label>핸드폰</label>
    <input
      {...register("phone", {
        required: { value: true, message: "핸드폰 번호는 필수값입니다." },
        pattern: {
          value: /^(\d{3})-(\d{3,4})-(\d{4})$/,
          message: "알맞지 않은 핸드폰 포맷입니다.",
        },
      })}
      type="tel"
    />
    {errors.phone && <span>{errors.phone.message}</span>}
    <label>성별</label>
    <select {...register("gender", { required: true })}>
      {GENDER_OPTIONS.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
    <label>특이사항</label>
    <textarea {...register("note", { minLength: 0, maxLength: 500 })} />
    <Button>등록하기</Button>
  </FormSection>
);
```

### 기존 Input component 코드 리팩토링

기존 개발 + 스타일링이 되어 있는 Input 컴포넌트에서 props로 register를 받아 재사용할 수 있는 컴포넌트로 리팩토링 해봤다.

```tsx
// 기존 타입
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  fill?: boolean;
}

// 수정 타입
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  label?: string;
  error?: FieldError | boolean;
  errorMessage?: string;
  register?: UseFormRegisterReturn;
  fill?: boolean;
}
```

수정 된 점은 register props 타입을 새로 추가했고 error타입을 FieldError 혹은 boolean 타입 중에 하나인 유니온 타입으로 수정했다.
FieldError같은 경우 react-hook-form의 errors객체 타입 대응을 위한거고 boolean타입은 앞에 말한 상황을 제외한 일반적인 상황을 대응하기 위해 추가했다.

```tsx
export default function Input({
  label,
  icon,
  error,
  errorMessage,
  register,
  fill,
  ...props
}: InputProps) {
  return (
    <InputWrapper $fill={fill}>
      {label && <StyledLabel>{label}</StyledLabel>}
      <Wrapper>
        {icon && icon}
        <StyledInput {...register} {...props} />
      </Wrapper>
      {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </InputWrapper>
  );
}
```

input component 코드의 바뀐점은 register라는 props추가와 input 태그에 register props를 스프레드 연산자로 받아오는것이다.
react-hook-form은 비제어 컴포넌트이기 때문에 자체적으로 input을 조작하는 코드가 register에 포함되어 있어 스프레드 연산자로 받아왔고 추가적인 props대응을 위해 register뒤에 props를 제거하지 않고 그대로 두었다.

실제 사용은 아래와 같은 코드로 할 수 있고, 재사용성을 극대화 할 수 있었다.

```tsx
<Input
  label="성명"
  error={errors.name}
  errorMessage={errors.name?.message}
  register={register("name", {
    required: { value: true, message: "이름은 필수값입니다." },
    maxLength: { value: 50, message: "이름은 1자이상 50자 이하입니다." },
    pattern: {
      value: /^[가-힣a-zA-Z]+(?:\s[가-힣a-zA-Z]+)*$/,
      message: "알맞지 않은 이름 형식입니다.",
    },
  })}
/>
```

## 기존 코드와 관련해서 react-hook-form이 좋았던 점

### 한눈에 보이는 리렌더링 효과와 상태관리 최소화

react-hook-form을 사용한 컴포넌트를 개발자도구 Profiler을 사용해서 확인한 결과 에러메세지가 변화할때를 제외하고는 리렌더링이 발생하지 않는 것을 확인할 수 있었다. 성능과 직결된 리렌더링과 관련해서 이러한 기능을 제공한다니.. react-hook-form을 사용하지 않을 이유가 없었다.

그렇다면 이유를 살펴보자.
react-hook-form이 이렇게 리렌더링을 최소화 할 수 있었던 것은 '비제어 컴포넌트'를 사용하고 있다고 나와있다. 비제어 컴포넌트란 React에 의해 값이 제어되지 않는 컴포넌트를 의미한다. React의 렌더링 조건 몇 가지 중 하나인 상태의 변화를 추적하지 않는 방식을 사용하기 때문에 리렌더링이 발생하지 않는 것은 당연하다. 우리는 그저 입력한 값에 대해 버튼을 눌렀을 때 받아오면 되는 것이다. 그렇기 때문에 이전 코드에서 확인할 수 있었던 useState를 사용한 상태관리를 하지 않아도 되는 것도 react-hook-form을 사용하는 이유 중 하나다.

또한 개인적으로 느꼈던 장점 중에 하나는 표준화 된 유효성 검사 규칙을 사용한다는 것이다 ( [Apply validation](https://react-hook-form.com/get-started#Applyvalidation) ). custom hook을 사용해서 자체적으로 유효성 검사 로직을 작성하는 것보다는 약속 된 규칙에 따라 작성할 수 있다는 것이 협업과 유지보수면에서 장점이라고 생각한다.
