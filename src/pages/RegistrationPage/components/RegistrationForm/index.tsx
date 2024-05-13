import Button from "components/Button";
import { SelectOption } from "components/Select";
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

const GENDER_OPTIONS: SelectOption[] = [
  { value: "M", label: "남자" },
  { value: "W", label: "여자" },
];

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Info>();
  const onSubmit: SubmitHandler<Info> = (data) => {
    console.log(data);
  };

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
}
