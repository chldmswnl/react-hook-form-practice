import styled from 'styled-components'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    error?: boolean
    errorMessage?: string
    fill?: boolean
}

const TextareaWrapper = styled.div<{ $fill?: boolean }>`
    width: ${({ $fill }) => $fill && '100%'};
    display: flex;
    flex-direction: column;
    row-gap: 5px;
`

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    column-gap: 5px;

    width: 100%;
    padding: 8px 10px;

    border: 1px solid #cccccc;

    background-color: #fff;
`

const StyledTextarea = styled.textarea`
    width: 100%;
    height: 150px;

    border: none;
    color: #636363;

    &::placeholder {
        color: #aaaaaa;
    }

    &:disabled {
        background-color: #fff;
    }
`

const StyledLabel = styled.label`
    font-size: 14px;
    font-weight: 700;
`

const ErrorMessage = styled.span`
    color: #ed000c;
    font-size: 12px;
    font-weight: 600;
`

export default function Textarea({ label, error, errorMessage, fill, ...props }: TextareaProps) {
    return (
        <TextareaWrapper $fill={fill}>
            {label && <StyledLabel>{label}</StyledLabel>}
            <Wrapper>
                <StyledTextarea {...props} />
            </Wrapper>
            {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </TextareaWrapper>
    )
}
