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
