import './App.css';
import { Route, Switch, useHistory } from "react-router-dom";
import React, { useReducer, useState } from "react";
import { Constants } from "./Constants";
import StoreLayout from "./storeLayout";
import { StoreContext, storeReducer } from "./store/storeReducer";
import Action from "./constants/Action";
import { initialStoreState } from "./store/storeStates";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderPage from "./pages/OrderPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import OrdersPage from "./pages/OrdersPage";
import AdminLayout from "./adminLayout";

function App() {
    const [storeState, dispatch] = useReducer(storeReducer, initialStoreState)

    const dataFetch = async (url) => {
        return await fetch(Constants.SERVER_URL + url).then(data => data.json());
    }

    useState((async () => {
        const email = localStorage.getItem('userEmail') || '';
        const customerResponse = await dataFetch('/customers');
        const productsResponse = await dataFetch('/products');
        const skuResponse = await dataFetch('/skus');
        const reviewsResponse = await dataFetch('/reviews')
        await dispatch({type: Action.loadCustomers, payload: customerResponse});
        await dispatch({type: Action.loadProducts, payload: productsResponse});
        await dispatch({type: Action.loadSkus, payload: skuResponse});
        await dispatch({type: Action.loadReviews, payload: reviewsResponse});
        if(email){
            dispatch({
                type: Action.login,
                payload: {email}
            });
        }

    }), []);

    const history = useHistory();
    return (
        <StoreContext.Provider value={{storeState, dispatch}}>
            <Switch history={history}>
                <StoreLayout>
                    <Route exact path="/" render={() => {
                        history.push('/products');
                    }}></Route>
                    <Route exact path="/admin" component={AdminPage}></Route>
                    <Route exact path="/products" component={ProductsPage}></Route>
                    <Route exact path="/login" component={LoginPage}></Route>
                    <Route exact path="/orders" component={OrdersPage}></Route>
                    <Route exact path="/products/:product_id" component={ProductDetailPage}></Route>
                    <Route exact path="/checkout" component={CheckoutPage}></Route>
                    <Route exact path="/orders/:orderId" component={OrderPage}></Route>
                </StoreLayout>

            </Switch>
        </StoreContext.Provider>
    );
}

export default App;
