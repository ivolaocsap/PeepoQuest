import React from 'react';
import styled from 'styled-components';

export interface InputProps {
  endAdornment?: React.ReactNode;
  onChange: (value?: number) => void;
  placeholder?: string;
  startAdornment?: React.ReactNode;
  value: number;
  disable?: boolean;
  type?: string;
  onClick?: () => void;
}

const Input: React.FC<InputProps> = ({
  endAdornment,
  onChange,
  placeholder,
  startAdornment,
  value,
  disable,
  type = 'number',
  onClick,
}) => {
  return (
    <StyledInputWrapper>
      {!!startAdornment && startAdornment}
      <StyledInput
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        disabled={disable}
        type={type}
        min={0}
        onClick={onClick}
      />
      {!!endAdornment && endAdornment}
    </StyledInputWrapper>
  );
};

const StyledInputWrapper = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.color.grey[200]};
  border-radius: ${(props) => props.theme.borderRadius}px;
  display: flex;
  padding: 0 ${(props) => props.theme.spacing[3]}px;
`;

const StyledInput = styled.input`
  background: none;
  border: 0;
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 18px;
  flex: 1;
  height: 46px;
  margin: 0;
  padding: 0;
  outline: none;
  font-family: ${(props) => props.theme.font.monospace};
`;

export default Input;
