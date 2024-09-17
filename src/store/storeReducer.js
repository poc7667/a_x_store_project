import { createContext } from "react";
import Action from "../constants/Action";

export function storeReducer(state, action) {
    let reviews = Object.assign({}, state.reviews)
    switch (action.type) {
        case Action.loadProducts:
            return Object.assign({}, state, {products: action.payload}, {isLoading: false});
        case Action.loadProduct:
            const activeProduct = state.products.filter(product => product.id === action.payload)[0] || {}
            return Object.assign({}, state, {activeProduct});
        case Action.loadSkus:
            const newSkus = {...state.skus};

            action.payload.forEach(skuItem =>{
                const {product_id} = skuItem;
                /**
                 * Add dummy title
                 */
                if (!newSkus[product_id]){
                    newSkus[product_id] = []
                }
                const {
                    size,
                    color,
                    style,
                } = skuItem;
                const title = [color, size, style].filter(i => i?.length).join("/ ") || ''
                skuItem.title = title
                newSkus[product_id].push(skuItem);
            })
            return Object.assign({}, state, {skus: newSkus});
        case Action.selectSku:
            return Object.assign({}, state, action.payload);
        case Action.clearActiveSku:
            return Object.assign({}, state, {activeSkuId: null});
        case Action.addItemToCart:
            // Didn't handle the stock in sku.
            let cart = Object.assign({}, state.cart)
            let skus =  Object.assign({}, state.skus)
            const {sku, quantity} = action.payload;
            const product = state.products.filter(item=> item.id === sku.product_id)[0];
            if (!cart[sku.id]) {
                cart[sku.id] = {
                    name: product?.productName|| 'No name',
                    sku: {...sku},
                    quantity: quantity
                }
            } else {
                cart[sku.id].quantity += quantity;

            }
            // Offset stock
            skus[sku.product_id].filter(item=> item.id === sku.id)[0].stock -= quantity;
            if (cart[sku.id].quantity === 0) {
                cart[sku.id] = undefined;
            }
            return Object.assign({}, state, {cart, skus});
        case Action.login:
            localStorage.setItem('userEmail', action.payload.email);
            const customer = Object.values(state.customers).filter(user => user.email === action.payload.email)?.[0]
            return Object.assign({}, state, {user: customer});
        case Action.logout:
            localStorage.setItem('userEmail', '');
            return Object.assign({}, state, {user: {}});
        case Action.loadReviews:
            action.payload.map(review=>{
                const {
                    nickname,
                    product_id,
                    customer_id
                } = review
                const {firstName, lastName} = state.customers[customer_id]
                review.title = nickname || `${firstName} ${lastName}`;
                // load sku description for each review
              if (!reviews[product_id]){
                  reviews[product_id] = [];
              }
              reviews[product_id].push({...review});
            })
            return Object.assign({}, state, {reviews});
        case Action.addReview:
            let newReviews = action.payload;
            const {
                nickname,
                customer_id
            } = newReviews
            const {firstName, lastName} = state.customers[customer_id]
            newReviews.title = nickname || `${firstName} ${lastName}`;
            reviews[action.payload.product_id].push(newReviews);
            return Object.assign({}, state, {reviews});
        case Action.loadCustomers:
            console.log(action.payload);
            return Object.assign({}, state, {customers: action.payload.reduce((data, customer)=>{
                data[customer.id] = customer;
                return data;
            },{})});

        case Action.clearCart:
            return Object.assign({}, state, {cart:{}});
        default:
            return Object.assign({}, state);
    }
}

export const StoreContext = createContext(null);
