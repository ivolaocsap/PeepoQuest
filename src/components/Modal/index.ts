import styled from 'styled-components';

export { default } from './Modal';
export type { ModalProps } from './Modal';

export const ModalUpper = styled.div`
  padding: 0 0px 15px;
  margin: 0px 25px;
  display: grid;
  grid-auto-rows: auto;
  grid-template-rows: 1fr;
  grid-gap: 15px;
  border-bottom: solid 1px ${(props) => `${props.theme.color.primary.main}33`};
`;

export const ModalCenter = styled.div`
  background-color: ${(props) => props.theme.color.blue[600]};
  border-bottom: dashed 1px ${(props) => props.theme.color.blue[400]};
`;

export const ModalLower = styled.div`
  padding: 25px 25px;
  font-size: 18px;
`;

export const ModalHeader = styled.div<{ center?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ center }) => (center ? 'center' : 'flex-start')};
  background-color: #5a8f35;
  padding: 16px 22px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: 18px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const ModalBody = styled.div`
  padding: 22px 22px;
  font-size: 18px;

  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const ModalBodyNoPadding = styled.div`
  font-size: 18px;

  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const ModalTitle = styled.div`
  font-size: 20px;

  color: #5a8f35;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 18px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  right: 16px;
  top: 16px;
  appearance: none;
  background-color: transparent;
  color: #fff;
  font-weight: 700;
  border: none;
  font-size: 20px;
  cursor: pointer;

  &:hover {
  }
`;
