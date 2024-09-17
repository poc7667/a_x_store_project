import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../store/storeReducer";
import CartContent from "../components/CartContent";
import useCartSubtotal from "../hooks/useCartSubtotal";
import { Link, useHistory } from "react-router-dom";
import { Constants } from "../Constants";
import Action from "../constants/Action";

const CheckoutPage = () => {
    const {storeState: {shippingCost, cart, user},  dispatch} = useContext(StoreContext);
    const [subtotal, setSubtotal] = useCartSubtotal();
    const [cartItems, setCartItems] = useState(null);
    const [paymentInfo, setPaymentInfo] = useState({
        method: '',
        info: {}
    });

    const [contact, setContact] = useState({
        firstName: 'Ying',
        lastName: 'Chen',
        streetAddress: '1549 Belleville Way',
        apartment: 'unit A',
        postcode: '94087',
        state: 'CA',
        city: 'Sunnyvale',
        phone: '310-437-3860',
        email: 'a@ying.chen',
    });

    const updateContactHandler = (fieldName, event) => {
        setContact({...contact, [fieldName]: event.target.value})
    }
    const history = useHistory();

    useEffect(() => {
        if (Object.values(cart).length) {
            setCartItems(Object.values(cart));
            setSubtotal(Object.values(cart));
        }
    }, [cart]);

    if (!cartItems) {
        return (<></>);
    }
    const submitOrderHandler = async () => {

        /**
         * 1. clear cart.
         * 2. submit order
         * 3. ok: show success
         * 4. fail: show failed.
         */
        const skuResponse = await fetch(Constants.SERVER_URL + '/skus').then(data => data.json());

        const postData = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                user,
                line_items: cartItems,
                contact,
                payment_info:paymentInfo
            }) // body data type must match "Content-Type" header
        }
        const response = await fetch(Constants.SERVER_URL + '/orders/', postData);
        dispatch({type: Action.clearCart, payload: null});
        history.push('/orders/1');
    }

    return (
        <>
            <section className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 col-md-6">
                            <div className="rounded shadow-lg p-4">
                                <h5 className="mb-0">Billing Details</h5>
                                <form className="mt-4">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label className="form-label">Your Name <span
                                                    className="text-danger">*</span></label>
                                                <input name="name" id="firstName"
                                                       value={contact.firstName}
                                                       onChange={(e)=>updateContactHandler('firstName', e)}
                                                       type="text" className="form-control"
                                                       placeholder="First Name :"/>
                                            </div>
                                        </div>
                                        {/*end col*/}
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label className="form-label">Last Name <span
                                                    className="text-danger">*</span></label>
                                                <input name="name" id="lastName"
                                                       value={contact.lastName}
                                                       onChange={(e)=>updateContactHandler('lastName', e)}
                                                       type="text" className="form-control"
                                                       placeholder="Last Name :"/>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label className="form-label">Street address <span
                                                    className="text-danger">*</span></label>
                                                <input type="text" name="streetAddress" id="streetAddress"

                                                       value={contact.streetAddress}
                                                       onChange={(e)=>updateContactHandler('streetAddress', e)}
                                                       className="form-control"
                                                       placeholder="House number and street name :"/>
                                            </div>
                                        </div>
                                        {/*end col*/}
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label className="form-label">Apartment, suite, unit etc. <span
                                                    className="text-muted">(Optional)</span></label>
                                                <input type="text" name="address2" id="address2"
                                                       className="form-control"
                                                       value={contact.apartment}
                                                       onChange={(e)=>updateContactHandler('apartment', e)}
                                                       placeholder="Apartment, suite, unit etc. :"/>
                                            </div>
                                        </div>
                                        {/*end col*/}
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Town / City <span
                                                    className="text-danger">*</span></label>
                                                <input type="text" name="city" id="city" className="form-control"
                                                       value={contact.city}
                                                       onChange={(e)=>updateContactHandler('city', e)}
                                                       placeholder="City Name :"/>
                                            </div>
                                        </div>
                                        {/*end col*/}
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Postal Code <span
                                                    className="text-danger">*</span></label>
                                                <input type="text" name="postcode" id="postcode"
                                                       value={contact.postcode}
                                                       onChange={(e)=>updateContactHandler('postcode', e)}
                                                       className="form-control" placeholder="Zip :"/>
                                            </div>
                                        </div>
                                        {/*end col*/}
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">State <span
                                                    className="text-danger">*</span></label>
                                                <input type="text" name="state" id="state" className="form-control"
                                                       value={contact.state}
                                                       onChange={(e)=>updateContactHandler('state', e)}
                                                       placeholder="State Name :"/>
                                            </div>
                                        </div>
                                        {/*end col*/}
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Country <span
                                                    className="text-danger">*</span></label>
                                                <select className="form-select form-control"
                                                        aria-label="Default select example">
                                                    <option selected>Taiwan</option>
                                                    <option value="AF">USA</option>
                                                </select>
                                            </div>
                                        </div>
                                        {/*end col*/}
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label className="form-label">Phone <span
                                                    className="text-danger">*</span></label>
                                                <input type="text" name="phone" id="phone" className="form-control"
                                                       value={contact.phone}
                                                       onChange={(e)=>updateContactHandler('phone', e)}
                                                       placeholder="State Name :"/>
                                            </div>
                                        </div>
                                        {/*end col*/}
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label className="form-label">Your Email <span
                                                    className="text-danger">*</span></label>
                                                <input name="email" id="email" type="email" className="form-control"
                                                       value={contact.email}
                                                       onChange={(e)=>updateContactHandler('email', e)}
                                                       placeholder="Your email :"/>
                                            </div>
                                        </div>
                                        {/*end col*/}
                                        <PaymentSection setPaymentInfo={setPaymentInfo}/>
                                    </div>
                                    {/*end row*/}
                                </form>
                                {/*end form*/}
                            </div>
                        </div>
                        {/*end col*/}
                        <div className="col-lg-5 col-md-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
                            <div className="rounded shadow-lg p-4 sticky-bar">
                                <CartContent cartItems={cartItems}></CartContent>
                                <div className="d-flex mb-4 justify-content-between">
                                    <h5>{cartItems.length} Items</h5>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-center table-padding mb-0">
                                        <tbody>
                                        <tr>
                                            <td className="h6 border-0">Subtotal</td>
                                            <td className="text-end fw-bold border-0">$ {subtotal.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="h6">Shipping Charge</td>
                                            <td className="text-end fw-bold">$ {shippingCost.toFixed(2) }</td>
                                        </tr>
                                        <tr className="bg-light">
                                            <td className="h5 fw-bold">Total</td>
                                            <td className="text-end text-primary h4 fw-bold">$ {(subtotal + shippingCost).toFixed(2)}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div className="mt-4 pt-2">
                                        <div className="d-grid">
                                            <button onClick={() => {
                                                submitOrderHandler()
                                            }} className="btn btn-primary">Place Order
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*end row*/}
                </div>
                {/*end container*/}
            </section>
        </>
    )
}

const PaymentSection = ({setPaymentInfo}) => {
    const [paymentDetail, setPaymentDetail] = useState({type: 'ach', payload: {
            exp_date: '01/06',
            card_number: '6011 6011 6011 6611',
            security_code: '356',
            routing_number: '121122676',
            account_number: '101200453'
        }});
    const payloadChange = (fieldName, event)=>{
        const newPayload = {...paymentDetail.payload, [fieldName]: event.target.value}
        updatePaymentDetail({...paymentDetail, payload: newPayload})
    }
    const setPaymentType = (paymentType) => {
        updatePaymentDetail({...paymentDetail, type:paymentType})
    }
    const updatePaymentDetail = (newPayload) =>{
        setPaymentDetail(newPayload)
        setPaymentInfo(newPayload)
    }
    // init update.
    useEffect(() => {
        updatePaymentDetail(paymentDetail);
    },[])

    return (
        <>
            <div className="col-12">
                <div className="mb-3">
                    <label className="form-label">Payment method<span
                        className="text-danger">*</span></label>
                    <div className="custom-control custom-radio custom-control-inline">
                        <div className="form-check mb-0">
                            <input className="form-check-input"
                                   checked={'credit_card'===paymentDetail.type}
                                   type="radio"
                                   onChange={() => {
                                       setPaymentType('credit_card')
                                   }} name="flexRadioDefault" id="flexRadioDefault1"/>
                            <label className="form-check-label" htmlFor="flexRadioDefault1">Credit card</label>
                        </div>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <div className="form-check mb-0">
                            <input className="form-check-input" type="radio"
                                   checked={'ach'===paymentDetail.type}
                                   onChange={() => {
                                       setPaymentType('ach')
                                   }} name="flexRadioDefault" id="flexRadioDefault2"/>
                            <label className="form-check-label" htmlFor="flexRadioDefault2">ACH</label>
                        </div>
                    </div>
                </div>
            </div>
            {paymentDetail.type === "ach" && (
                <>
                    <div className="col-12">
                        <div className="mb-3">
                            <label className="form-label">Account number<span
                                className="text-danger">*</span></label>
                            <input name="name" id="account_number"
                                   value={paymentDetail.payload?.account_number}
                                   onChange={(e)=>payloadChange('account_number', e)}
                                   type="text" className="form-control"
                                   placeholder="Account number"/>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mb-3">
                            <label className="form-label">Routing number<span
                                className="text-danger">*</span></label>
                            <input name="name" id="routing_number"
                                   value={paymentDetail.payload?.routing_number}
                                   onChange={(e)=>payloadChange('routing_number', e)}
                                   type="text" className="form-control"
                                   placeholder="Routing number"/>
                        </div>
                    </div>
                </>
            )
            }
            {paymentDetail.type === "credit_card" && (
                <>
                    <div className="col-12">
                        <div className="mb-3">
                            <label className="form-label">Card number<span
                                className="text-danger">*</span></label>
                            <input name="name" id="card_number"
                                   value={paymentDetail.payload?.card_number}
                                   onChange={(e)=>payloadChange('card_number', e)}
                                   type="text" className="form-control"
                                   placeholder="Card number"/>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mb-3">
                            <label className="form-label">Exp date(mmYY)<span
                                className="text-danger">*</span></label>
                            <input name="name" id="exp_date"
                                   value={paymentDetail.payload?.exp_date}
                                   maxLength={4}
                                   onChange={(e)=>payloadChange('exp_date', e)}
                                   type="text" className="form-control"
                                   placeholder="Exp date"/>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mb-3">
                            <label className="form-label">Security code<span
                                className="text-danger">*</span></label>
                            <input name="name" id="security_code"
                                   value={paymentDetail.payload?.security_code}
                                   maxLength={3}
                                   onChange={(e)=>payloadChange('security_code', e)}
                                   type="text" className="form-control"
                                   placeholder="Security code"/>
                        </div>
                    </div>
                </>
            )
            }
        </>
    )
}

export default CheckoutPage;
