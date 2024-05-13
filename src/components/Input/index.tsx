import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  label?: string;
  error?: FieldError | boolean;
  errorMessage?: string;
  register?: UseFormRegisterReturn;
  fill?: boolean;
}

const InputWrapper = styled.div<{ $fill?: boolean }>`
  width: ${({ $fill }) => $fill && "100%"};
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;

  width: 100%;
  padding: 8px 10px;

  border: 1px solid #cccccc;

  background-color: #fff;
`;

const StyledInput = styled.input`
  width: 100%;

  border: none;
  line-height: 24px;
  color: #636363;

  &::placeholder {
    color: #aaaaaa;
  }

  &:disabled {
    background-color: #fff;
  }
`;

const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: 700;
`;

const ErrorMessage = styled.span`
  color: #ed000c;
  font-size: 12px;
  font-weight: 600;
`;

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
