import Navbar from '../features/navbar/Navbar';
import ProductList from '../features/productList/ProductList';
function Home() {
  return (
    <Navbar>
      <ProductList></ProductList>
    </Navbar>
  );
}

export default Home;
