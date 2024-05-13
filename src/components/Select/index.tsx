import styled from "styled-components";

export interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  label?: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: 5px;
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: 700;
`;

const StyledSelect = styled.select`
  padding: 10px;
  border: 1px solid #cccccc;
  outline: none;
`;

export default function Select({ label, options, ...props }: SelectProps) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <StyledSelect {...props}>
        {options.map(({ value, label }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </StyledSelect>
    </Wrapper>
  );
}
