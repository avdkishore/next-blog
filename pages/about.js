// import Layout from '../components/Layout';
import LayoutHOC from '../components/LayoutHOC';

// export default function About() {
//   return (
//     <Layout>
//       <p>This is the about page</p>
//     </Layout>
//   );
// }

const Page = () => <p>This is the about page</p>;

export default LayoutHOC(Page);