import { useContext, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router";
import ProductSlides from "../components/ProductSlides";
import SkuItems from "../components/SkuItems";
import { Constants } from "../Constants";
import { StoreContext } from "../store/storeReducer";
import Action from "../constants/Action";
import ProductReviews from "../components/ProductReviews";

const ProductDetailPage = () => {
    const {product_id} = useParams();
    const {storeState, dispatch} = useContext(StoreContext);
    const {products, activeProduct, activeProduct: {productName, description}, skus, reviews} = storeState;
    const [selectedSku, setSelectedSku] = useState(null);
    const [numOfSelectedSku, setNumOfSelectedSku] = useState(0);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const {loading, setLoading} = useState(storeState.isLoading);

    const currentProductSkus = skus[product_id];

    /***
     * Update sku handler
     * @param sku
     */
    const updateSelectedSkuHandler = (sku) => {
        setSelectedSku(sku);
        dispatch({type: Action.selectSku, payload: {activeSkuId: sku.id}})
    }

    useEffect(() => {
        dispatch({type: Action.clearActiveSku, payload: null})
        if (products) {
            dispatch({type: Action.loadProduct, payload: product_id})
        }
        if (currentProductSkus) {
            updateSelectedSkuHandler(currentProductSkus[0]);
        }
    }, [currentProductSkus, products])

    useEffect(() => {
        if (selectedSku && numOfSelectedSku > selectedSku.stock) {
            setNumOfSelectedSku(selectedSku.stock)
        }
    }, [selectedSku])

    /**
     * Update stock
     */
    useEffect(() => {
        if (Array.isArray(currentProductSkus) && selectedSku){
            currentProductSkus.forEach(item =>{
                if(item.id === selectedSku.id && item.stock !== selectedSku.stock) {
                    updateSelectedSkuHandler(item);
                }
            })
        }
    },[skus])


    const updateNumOfSelectedSku = (delta) => {
        if (delta + numOfSelectedSku > selectedSku.stock || delta + numOfSelectedSku < 0) {
            return;
        }
        setNumOfSelectedSku(delta + numOfSelectedSku);
    }

    const addItemToCartHandler = () => {
        dispatch({type: Action.addItemToCart, payload: {sku: selectedSku, quantity: numOfSelectedSku}})
    }

    if (loading || !selectedSku) {
        return (<div>
            Loading
        </div>)
    }

    return (
        <div className="row align-items-center">
            <ProductSlides activeProduct={activeProduct} skus={currentProductSkus}></ProductSlides>
            {/*end col*/}
            <div className="col-md-7 mt-4 mt-sm-0 pt-2 pt-sm-0">
                <div className="section-title ms-md-4">
                    <h4 className="title"> {productName} </h4>
                    <h5 className="text-muted">${selectedSku.price}
                        <del className="text-danger ms-2">$ {(selectedSku.price / Constants.DISCOUNT).toFixed(2)}</del>
                    </h5>
                    <ul className="list-unstyled text-warning h5 mb-0">
                        <li className="list-inline-item"><i className="mdi mdi-star"/></li>
                        <li className="list-inline-item"><i className="mdi mdi-star"/></li>
                        <li className="list-inline-item"><i className="mdi mdi-star"/></li>
                        <li className="list-inline-item"><i className="mdi mdi-star"/></li>
                        <li className="list-inline-item"><i className="mdi mdi-star"/></li>
                    </ul>
                    <h5 className="mt-4 py-2">Overview :</h5>
                    <p className="text-muted">{description}</p>
                    <ul className="list-unstyled text-muted">
                    </ul>
                    {Object.keys(currentProductSkus).length > 1 &&
                    <div className="row mt-4 pt-2">
                        <div className="col-lg-12 col-12">
                            <SkuItems updateSelectedSkuHandler={updateSelectedSkuHandler} activeProduct={activeProduct}
                                      skus={currentProductSkus}/>
                        </div>
                    </div>
                    }

                    <div className="row mt-4 pt-2">

                        {/*end col*/}
                        <div className="col-lg-6 col-12 mt-4 mt-lg-0">
                            <div className="d-flex shop-list align-items-center">
                                <h6 className="mb-0">Quantity:</h6>
                                <div className="qty-icons ms-3">
                                    <button onClick={() => {
                                        updateNumOfSelectedSku(-1)
                                    }}
                                            className="btn btn-icon btn-soft-primary minus">-
                                    </button>
                                    <input min={0}
                                           max={selectedSku?.stock}
                                           name="quantity"
                                           value={numOfSelectedSku}
                                           onChange={() => {
                                           }}
                                           type="number"
                                           className="btn btn-icon btn-soft-primary qty-btn quantity"/>
                                    <button onClick={() => {
                                        updateNumOfSelectedSku(1)
                                    }}
                                            className="btn btn-icon btn-soft-primary plus">+
                                    </button>
                                </div>

                            </div>
                        </div>

                        {/*end col*/}
                    </div>
                    <div className="row mt-4 pt-2">
                        <div className="col-lg-6 col-12 mt-4 mt-lg-0">
                            <div className="d-flex shop-list align-items-center">
                                <h6 className="mb-0">Stock:</h6>
                                <div className="qty-icons ms-3">
                                    {selectedSku.stock}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*end row*/}
                    <div className="mt-4 pt-2">
                        <button onClick={() => {
                            addItemToCartHandler()
                            setSubmitDisabled(true);
                            setTimeout(() => {
                                setSubmitDisabled(false);
                            }, 1500)
                        }} className="btn btn-soft-primary ms-2" disabled={!numOfSelectedSku || submitDisabled}>Add to
                            Cart
                        </button>
                    </div>
                </div>
            </div>
            <ProductReviews selectedSku={selectedSku} productSkus={skus[product_id]} productReviews={reviews[product_id]}/>
            {/*end col*/}
        </div>
    )
}

export default ProductDetailPage;
