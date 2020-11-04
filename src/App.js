// React staples
import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';

// Components
import Currency from './js/components/Currency';

// Pages
import NotFound from './js/pages/404';
import Products from './js/pages/Products';
import ProductDetail from './js/pages/ProductDetail';

// Styles
import './css/xyz.css';

// DB Stuff
import products from './data/products.json';

function App() {

    // Hook up our currency
    const [currency, setCurrency] = useState('AUD');
    function changeCurrency(newCurrency) {
        setCurrency(newCurrency);
    }

    return (
        <div className="App">
            <Router>

                <header>
                    <Link to={"/"}>
                        <img src={process.env.PUBLIC_URL + '/img/logo.png'} className="App-logo" alt="logo" />
                    </Link>
                    <Currency currency={currency} onChange={changeCurrency} />
                </header>

                <div className="main">
                    <Switch>
                        <Route exact path="/" render={(props) => <Products currency={currency} products={products} /> } />
                        <Route path="/products/:id" render={(props) => <ProductDetail currency={currency} products={products} {...props} /> } />
                        <Route exact path="/404" component={NotFound} />
                        <Redirect to="/404" />
                    </Switch>
                </div>

            </Router>
        </div>
    );
}

export default App;
