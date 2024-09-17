import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import CartContent from "./CartContent";
import useCartSubtotal from "../hooks/useCartSubtotal";

const Cart = (props) => {
    const {cart, expandCart, setExpandCartHandler} = props;
    const [subtotal, setSubtotal] = useCartSubtotal();
    const [cartItems, setCartItems] = useState();


    useEffect(() => {
        if (Object.values(cart)){
            setCartItems(Object.values(cart));
            setSubtotal(Object.values(cart));
        }
    }, [cart])

    if (!Object.keys(cart).length) {
        return <></>;
    }
    return (
        <div
            className={`dropdown-menu dd-menu dropdown-menu-end bg-white shadow rounded border-0 mt-3 p-4 ${expandCart?'show':''}`}
            style={{width: 300}}>
            <CartContent cartItems={cartItems}></CartContent>
            <div className="d-flex align-items-center justify-content-between pt-4 border-top">
                <h6 className="text-dark mb-0">Total($):</h6>
                <h6 className="text-dark mb-0">${ subtotal.toFixed(2) }</h6>
            </div>
            <div className="mt-3 text-center">
                <Link to={`/checkout`} onClick={()=>{setExpandCartHandler(false)}}  className="btn btn-primary">Checkout</Link>
            </div>
        </div>
    )
}

export default Cart;
