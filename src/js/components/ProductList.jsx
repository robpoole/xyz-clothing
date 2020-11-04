import { Link } from 'react-router-dom';
import { displayPrice } from '../../Utils.js';

function ProductList(props) {

	var theList = [];
	for (var i = 0; i < props.products.length; i++) {

		theList.push(
			<Link to={"/products/"+props.products[i].id} key={i}>
				<div className="productContainer" key={i}>
					<div className="name">
						{props.products[i].name}
					</div>
					<div className="price">
						{displayPrice(props.currency, props.products[i].price.base, props.products[i].price.amount)}
					</div>
				</div>
			</Link>
		);
	}

    return (
        <div className="productList">
            {theList}
        </div>
    );
}

export default ProductList;