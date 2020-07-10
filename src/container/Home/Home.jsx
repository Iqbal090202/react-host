import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import BlogPost from '../BlogPost/BlogPost';
import Product from '../Product/Product';

class Home extends Component {
    render() {
        return (
            <BrowserRouter>
                <Fragment>
                    <div>
                        <Link to="/">Blog Post</Link>
                        <Link to="/product">Product</Link>
                    </div>
                    <Route path="/" exact component={BlogPost} />
                    <Route path="/product" component={Product} />
                </Fragment>
            </BrowserRouter>
        );
    }
}

export default Home;