import Button from "components/Button";
import Input from "components/Input";
import Textarea from "components/Textarea";
import useNameValidation from "hooks/useNameValidation";
import usePhoneValidation from "hooks/usePhoneValidation";
import { useState } from "react";
import styled from "styled-components";

interface Info {
  name: string;
  phone: string;
  note: string;
}

const FormSection = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  width: 400px;
`;

const DEFAULT_CONSULTING_INFO = {
  inboundSource: "",
  name: "",
  phone: "",
  placeName: "",
  note: "",
  agreement: false,
};

export default function RegistrationForm() {
  const [info, setInfo] = useState<Info>(DEFAULT_CONSULTING_INFO);
  const nameError = useNameValidation(info.name);
  const { error: phoneError, phone, setPhone } = usePhoneValidation(info.phone);

  const handleChange = (fieldName: keyof Info, value: string | number) => {
    setInfo((prevInfo) => ({
      ...prevInfo,
      [fieldName]: value,
    }));
  };

  const handleRegisterBtnClick = () => {};

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
      <Textarea
        label="특이사항"
        value={info.note}
        onChange={({ target }) => handleChange("note", target.value)}
        maxLength={500}
      />
      <Button onClick={handleRegisterBtnClick}>등록하기</Button>
    </FormSection>
  );
}
