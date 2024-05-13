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
