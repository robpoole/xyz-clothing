import ProductList from '../components/ProductList';

function Products(props) {

    return (
        <div className="products">

        	<h1>Products</h1>

	        <ProductList currency={props.currency} products={props.products} />

        </div>
    );
}

export default Products;