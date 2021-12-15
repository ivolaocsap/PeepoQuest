import ContentLoader from 'react-content-loader';
import { FormRow } from '../Form';

export const FormRowContentLoader: React.FC = () => {
  return (
    <FormRow>
      <div className="row-header">
        <ContentLoader
          style={{ width: '100%' }}
          speed={1}
          backgroundColor={'rgb(246 153 99 / 20%)'}
          foregroundColor={'rgb(246 153 99 / 30%)'}
          viewBox="0 0 100 20"
        >
          <rect x={0} y={4} rx={'0'} ry={'0'} width="20" height={4} />
          <rect x={0} y={12} rx={'0'} ry={'0'} width="40" height={4} />
          <rect x={60} y={4} rx={'0'} ry={'0'} width="40" height={4} />
          <rect x={80} y={12} rx={'0'} ry={'0'} width="20" height={4} />
        </ContentLoader>
      </div>
    </FormRow>
  );
};
