import styled from 'styled-components';

export const TxModalOutputAmount = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: ${(props) => props.theme.color.green[600]};
  font-family: ${(props) => props.theme.font.monospace};
`;

export const TxModalTokenName = styled.div`
  font-size: 30px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: ${(props) => props.theme.color.grey[750]};
  font-weight: 500;
`;

export const TxModalSlippageHelper = styled.div`
  font-size: 14px;
  font-family: ${({ theme }) => theme.font.monospace};
  font-weight: 400;
  text-align: center;
  color: ${({ theme }) => theme.color.grey[750]};
`;

export const TxModalDataRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
export const TxModalDataRowField = styled.div`
  color: ${(props) => props.theme.color.grey[750]};
  font-size: 30px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
export const TxModalDataRowValue = styled.div`
  margin-left: auto;
  color: ${(props) => props.theme.color.primary.main};
  font-size: 30px;
  background: -webkit-linear-gradient(#e7d58b, #dfb771);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  font-weight: 600;
`;

export const TxModalButtons = styled.div`
  margin-top: 36px;
  display: flex;
`;
