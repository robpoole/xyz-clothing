import { displayPrice, inArray } from '../../Utils.js';

import ProductList from '../components/ProductList';

function ProductDetail(props) {

	const product = props.products.find(prod => prod.id === parseInt(props.match.params.id));

	var relatedProducts = props.products.filter(prod => inArray(prod.id, product.relatedProducts));

    return (
        <div className="products">

        	<h1>{product.name}</h1>

	        <p>{displayPrice(props.currency, product.price.base, product.price.amount)}</p>

	        <p>{product.description}</p>

	        <h2>Related Products</h2>

			<ProductList currency={props.currency} products={relatedProducts} />

        </div>
    );
}

export default ProductDetail;