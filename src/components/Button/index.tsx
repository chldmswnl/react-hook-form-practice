import React from 'react'
import styled from 'styled-components'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode
    fill?: boolean
}

const StyledButton = styled.button<{ $fill?: boolean; $hasIcon?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: ${({ $hasIcon }) => ($hasIcon ? 'space-between' : 'center')};
    column-gap: 5px;

    width: ${({ $fill }) => $fill && '100%'};

    padding: 10px 20px;

    border-radius: 4px;
    background-color: #0078ff;
    color: #fff;

    font-size: 12px;
    font-weight: 600;
    line-height: 18px;

    &:disabled {
        opacity: 0.5;
    }
`

export default function Button({ children, icon, fill, ...props }: ButtonProps) {
    return (
        <StyledButton {...props} $fill={fill} $hasIcon={typeof icon !== 'undefined'}>
            <span>{children}</span>
            {icon && icon}
        </StyledButton>
    )
}
