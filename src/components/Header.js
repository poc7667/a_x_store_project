import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import Cart from "./Cart";
import { StoreContext } from "../store/storeReducer";
import Action from "../constants/Action";

const Header = () => {
    const {storeState: {cart, user}} = useContext(StoreContext);
    const {dispatch} = useContext(StoreContext);
    const [expandCart, setExpandCart] = useState(false);
    const [expandAccount, setExpandAccount] = useState(false);

    /**
     * Handler click outside
     * @param value
     */
    const headerPopupRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (headerPopupRef && !headerPopupRef.current.contains(event.target)) {
                setExpandCart(false);
                setExpandAccount(false);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [headerPopupRef])

    function setExpandCartHandler(value) {
        setExpandCart(value);
    }

    return (
        <header id="topnav" className="defaultscroll sticky" style={{background: 'white'}} >
            <div className="container">
                {/* Logo container*/}
                <Link className="logo" to="/">
                    <img src="/images/ucsc.png" height={24} className="logo-light-mode"/>
                </Link>
                <ul className="buy-button list-inline mb-0" ref={headerPopupRef}>
                    {user.email &&
                    <li className="list-inline-item mb-0" style={{marginRight: '15px'}}>
                        Hi {user.firstName} {user.firstName}!
                    </li>
                    }
                    <li className="list-inline-item mb-0 pe-1">
                        <div className="dropdown">
                            <button onClick={() => {
                                setExpandCart(!expandCart)
                            }} type="button" className="btn btn-icon btn-soft-primary dropdown-toggle"
                                    disabled={Object.keys(cart).length === 0}
                            ><i
                                className="uil uil-shopping-cart align-middle icons"/></button>
                            <Cart setExpandCartHandler={setExpandCartHandler} expandCart={expandCart}
                                  cart={cart}></Cart>
                        </div>
                    </li>

                    <li className="list-inline-item mb-0">
                        <div className="dropdown dropdown-primary">
                            <button
                                onClick={() => {
                                    setExpandAccount(!expandAccount)
                                }}
                                type="button" className="btn btn-icon btn-soft-primary dropdown-toggle"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i
                                className="uil uil-user align-middle icons"/></button>
                            <div
                                className={`dropdown-menu dd-menu dropdown-menu-end bg-white shadow rounded border-0 mt-3 py-3 ${expandAccount ? 'show' : ''}`}
                                style={{width: 200}}>
                                {user.id ? (<>
                                        <Link to={`/orders`} onClick={() => {
                                            setExpandAccount(false)
                                        }} className="dropdown-item text-dark">Order History</Link>
                                        <div className="dropdown-divider my-3 border-top"/>
                                        <Link to={`/products`} onClick={() => {
                                            setExpandAccount(false);
                                            dispatch({type: Action.logout, payload: null})
                                        }} className="dropdown-item text-dark">
                                            <i
                                                className="uil uil-sign-out-alt align-middle me-1"/>
                                            Logout
                                        </Link>
                                    </>
                                ) : (
                                    <Link to={`/login`} onClick={() => {
                                        setExpandAccount(false)
                                    }} className="dropdown-item text-dark">Login</Link>
                                )
                                }
                            </div>
                        </div>
                    </li>
                </ul>
                {/*end login button*/}
                {/* End Logo container*/}

                <div id="navigation">
                    {/* Navigation Menu*/}
                    <ul className="navigation-menu" style={{justifyContent: 'start'}}>
                        <li>
                            <Link to={`/`} className="sub-menu-item">Home
                            </Link>
                        </li>
                        <li>
                            <Link to={`/admin`} className="sub-menu-item">Admin
                            </Link>
                        </li>
                    </ul>
                    {/*end navigation menu*/}
                    <div className="buy-menu-btn d-none">
                        <a href="https://1.envato.market/4n73n" target="_blank" className="btn btn-primary">Buy Now</a>
                    </div>
                    {/*end login button*/}
                </div>
                {/*end navigation*/}
            </div>
            {/*end container*/}
        </header>
    )
}

export default Header;
