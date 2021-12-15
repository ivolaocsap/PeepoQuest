import ContentLoader from 'react-content-loader';

export const SubmitButtonContentLoader: React.FC = () => {
  return (
    <ContentLoader
      style={{ width: '100%' }}
      speed={1}
      backgroundColor={'rgb(246 153 99 / 20%)'}
      foregroundColor={'rgb(246 153 99 / 40%)'}
      viewBox="0 0 100 22"
    >
      <rect x={0} y={8} rx={'0'} ry={'0'} width="100" height={14} />
    </ContentLoader>
  );
};
