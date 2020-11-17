import { Link } from 'react-router-dom';

// Grab our handy functions
import { displayPrice, inArray } from '../../Utils.js';

// Grab our product list component
import ProductList from '../components/ProductList';

function ProductDetail(props) {

	// Grab our product out of the product area by the get variable
	const product = props.products.find(prod => prod.id === parseInt(props.match.params.id));

	// Grab our list of related products
	var relatedProducts = props.products.filter(prod => inArray(prod.id, product.relatedProducts));

    return (
        <div className="products">

        	<h1>{product.name}</h1>

        	<Link to={"/products/edit/"+parseInt(props.match.params.id)}>Edit Product Details</Link>

	        <p>{displayPrice(props.currency, product.price.base, product.price.amount)}</p>

	        <p>{product.description}</p>

	        <h2>Related Products</h2>

			<ProductList currency={props.currency} products={relatedProducts} />

        </div>
    );
}

export default ProductDetail;