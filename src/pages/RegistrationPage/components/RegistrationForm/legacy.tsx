import Button from "components/Button";
import Input from "components/Input";
import Select, { SelectOption } from "components/Select";
import Textarea from "components/Textarea";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

type Gender = "M" | "W";

interface Info {
  name: string;
  phone: string;
  gender: Gender;
  note: string;
}

const FormSection = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  width: 400px;
`;

const DEFAULT_CONSULTING_INFO = {
  name: "",
  phone: "",
  gender: "M" as Gender,
  note: "",
};

const GENDER_OPTIONS: SelectOption[] = [
  { value: "M", label: "남자" },
  { value: "W", label: "여자" },
];

export default function LegacyRegistrationForm() {
  const [info, setInfo] = useState<Info>(DEFAULT_CONSULTING_INFO);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Info>();
  const onSubmit: SubmitHandler<Info> = (data) => {
    console.log(data);
  };

  const handleChange = (fieldName: keyof Info, value: string | number) => {
    setInfo((prevInfo) => ({
      ...prevInfo,
      [fieldName]: value,
    }));
  };

  return (
    <FormSection onSubmit={handleSubmit(onSubmit)}>
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
      {/* <Input
        label="연락처"
        error={phoneError}
        errorMessage="올바른 휴대폰 번호를 입력해주세요"
        value={phone}
        onChange={({ target }) => setPhone(target.value)}
      /> */}
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
      <Button>등록하기</Button>
    </FormSection>
  );
}
