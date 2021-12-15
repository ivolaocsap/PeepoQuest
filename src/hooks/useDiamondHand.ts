import { useContext } from 'react';
import { Context } from '../contexts/DiamondHandProvider';

const useDiamondHand = () => {
  const { diamondHand } = useContext(Context);
  return diamondHand;
};

export default useDiamondHand;
