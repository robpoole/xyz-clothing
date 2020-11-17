import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const EditProductForm = props => {

	// Grab our product from our props
	const product = props.currentProduct;

	// Prepare our form feedback
	var defaultFeedback = {
		msg: ' ',
		url: '',
		style: {
			color: 'black'
		}
	}
	const [ feedback, setFeedback ] = useState(defaultFeedback);
	let feedbackTimeout = null;

	// Handle our form submission
	const submitForm = (event) => {

		event.preventDefault();

		// Grab all of our form data
		const data = [...event.target.elements]
		// Convert the data to an object
		.reduce((obj, current) => {
			obj[current.name] = current.value
			return obj
		}, {})

		// Let's validate!
		var valid = true;
		var failureMessage = '';

		// ID - must be unique
		for (var i = 0; i < props.products.length; i++) {
			if ((parseInt(props.products[i].id) === parseInt(data.id)) &&
				(parseInt(data.id) !== props.currentProduct.id)) {
				valid = false;
				failureMessage = 'Product ID must be unique';
			}
		}

		// Name - must be longer than 3 characters
		if (data.name.length < 3) {
			valid = false;
			failureMessage = 'Product name should be at least 3 characters';
		}

		// Price - must specify base and amount
		if (isNaN(parseFloat(data.priceAmount)) || parseFloat(data.priceAmount) === 0) {
			valid = false;
			failureMessage = 'Please provide a price';
		}

		// If we failed validation
		if (valid === false) {

			// Prepare our failure feedback
			var newFeedback = {
				msg: failureMessage,
				url: '',
				style: {
					backgroundColor: '#e74c3c'
				}
			}

			// Feedback success message
			setFeedback(newFeedback);
			feedbackTimeout = setTimeout(() => {
				setFeedback(defaultFeedback)
			}, 5000);
		}

		// If we passed validation continue!
		if (valid === true) {

			// Tidy up the product structure
			const updatedProduct = {
				"id": parseInt(data.id),
				"name": data.name,
				"description": data.description,
				"price": {
					"base": data.priceBase,
					"amount": data.priceAmount
				},
				"relatedProducts": product.relatedProducts
			}

			// Prepare our success feedback
			newFeedback = {
				msg: 'Product successfully updated!',
				url: "/",
				style: {
					backgroundColor: '#2ecc71'
				}
			}

			// Feedback success message
			setFeedback(newFeedback);
			feedbackTimeout = setTimeout(() => {
				setFeedback(defaultFeedback)
			}, 5000);

			// Update!
			props.updateProduct(product.id, updatedProduct);

		}
	}

	// Clear our feedback timeouts to avoid any leakage
	useEffect(() => {
		return () => {
			clearTimeout(feedbackTimeout);
		};
	}, []);

	// Return to product list page after update
	if (feedback.msg === "Product successfully updated!") {

		return <Redirect to={feedback.url} />

	} else {

		// Render our form!
		return (
			<form onSubmit={event => submitForm(event)}>
				<div className="feedback" style={feedback.style}>{feedback.msg}</div>
				<div className="formBlock">
					<label>Product ID</label>
					<input type="number" name="id" defaultValue={product.id} />
				</div>
				<div className="formBlock">
					<label>Product Name</label>
					<input type="text" name="name" defaultValue={product.name} />
				</div>
				<div className="formBlock">
					<label>Product Description</label>
					<textarea name="description" cols="50" rows="3" defaultValue={product.description} />
				</div>
				<div className="formBlock">
					<label>Price</label>
					<select name="priceBase" defaultValue={product.price.base}>
						<option value="AUD">AUD</option>
		                <option value="USD">USD</option>
		                <option value="CNY">CNY</option>
					</select>
					<input type="number" name="priceAmount" step=".01" defaultValue={product.price.amount} />
				</div>
				<div className="formBlock">
					<button>Update Product</button>
				</div>
			</form>
		)
	}

}

export default EditProductForm