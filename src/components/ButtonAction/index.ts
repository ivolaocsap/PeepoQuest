import styled from 'styled-components';

type ButtonActionProps = { buttonStyle?: string; isLoading?: boolean; background?: string };

export const ButtonAction = styled.button<ButtonActionProps>`
  padding: 0 15px;
  height: 60px;
  width: 100%;
  text-align: center;
  outline: none;
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  background-color: ${({ theme, background }) => background || theme.color.green[100]};
  color: ${({ isLoading, theme }) =>
    isLoading ? 'rgb(109, 168, 255, 0.7)' : theme.color.primary.main};
  font-size: 20px;
  font-weight: 600;
  pointer-events: ${({ isLoading }) => (isLoading ? 'none' : 'auto')};
  border: solid 0px ${({ theme }) => `${theme.color.primary.main}99`};
  transition: ease-in-out 150ms;
  &:hover {
    background-color: ${(props) => props.theme.color.green[100]};
  }
  &:disabled {
    background-color: ${({ buttonStyle, theme }) =>
      buttonStyle === 'danger' ? theme.color.red[300] : '#d5d5d5'};
    color: ${({ buttonStyle, theme }) =>
      buttonStyle === 'danger' ? theme.color.grey[300] : theme.color.grey[500]};
    border: solid 0px
      ${({ buttonStyle, theme }) =>
        buttonStyle === 'danger' ? theme.color.red[400] : theme.color.grey[500]};
    cursor: auto;
    box-shadow: none;
    outline: none;
    opacity: 1;
  }
  .loader {
    margin-right: 5px;
    height: 20px;
  }
`;

export const ButtonOutlineAction = styled.button<{ buttonStyle?: string; isLoading?: boolean }>`
  padding: 0 12px;
  height: 28px;
  width: 100%;
  text-align: center;
  border-radius: 6px;
  outline: none;

  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  background-color: transparent;
  color: ${({ isLoading, theme }) =>
    isLoading ? 'rgb(109, 168, 255, 0.7)' : theme.color.primary.main};
  font-size: 14px;
  font-weight: 600;
  pointer-events: ${({ isLoading }) => (isLoading ? 'none' : 'auto')};
  transition: ease-in-out 150ms;
  &:hover {
    background-color: ${(props) => props.theme.color.primary.main};
    color: ${(props) => props.theme.color.white};
  }
  &:disabled {
    color: ${({ buttonStyle, theme }) =>
      buttonStyle === 'danger' ? theme.color.grey[300] : theme.color.grey[600]};
    cursor: auto;
    box-shadow: none;
    pointer-events: none;
    border: 1px solid ${(props) => props.theme.color.grey[600]};
    outline: none;
    opacity: 0.8;
  }
  .loader {
    margin-right: 5px;
    height: 20px;
  }
`;
