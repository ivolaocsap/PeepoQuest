
import React from 'react';
import styled from 'styled-components';

interface CloseButtonProps {
  position?: 'absolute' | 'relative';
  top?: string;
  right?: string;
  size?: string;
  color?: string;
  onClick?: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({
  position,
  top,
  right,
  size,
  color,
  onClick,
}) => {
  return (
    <StyledButton
      position={position}
      top={top}
      right={right}
      size={size}
      color={color}
      onClick={onClick}
    >
     
    </StyledButton>
  );
};
const StyledButton = styled.button<CloseButtonProps>`
  position: ${({ position }) => position || 'relative'};
  font-size: ${({ size }) => size || '1.5rem'};
  font-weight: 500;
  line-height: 1;
  color: ${({ color }) => color || '#fff'};
  top: ${({ top }) => top || 'auto'};
  right: ${({ right }) => right || 'auto'};
  text-shadow: 0 1px 0 ${({ color }) => color || '#fff'};
  opacity: 1;
  cursor: pointer;
  padding: 0;
  background-color: transparent;
  border: 0;
  &:hover {
    opacity: 0.9;
  }
`;

export default CloseButton;
