import Header from './Header';

const layoutStyle = {
  margin: '20px',
  padding: '20px',
  border: '1px solid #DDD'
};

const LayoutHOC = Page => {
  return () => (
    <div style={layoutStyle}>
      <Header />
      <Page />
    </div>
  );
}

export default LayoutHOC;