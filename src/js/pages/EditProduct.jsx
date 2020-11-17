// Grab our edit form for inclusion
import EditProductForm from '../components/EditProductForm';

function EditProduct(props) {

	// Grab our current product based on the get variable
	const currentProduct = props.products.find(prod => prod.id === parseInt(props.match.params.id));

    return (

        <div className="products">

        	<h1>Edit Product</h1>

	        <EditProductForm currentProduct={currentProduct} products={props.products} updateProduct={props.updateProduct} />

        </div>
    );
}

export default EditProduct;