import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../store/storeReducer";

const ProductSlides = (props) => {
    const {storeState: {activeSkuId}} = useContext(StoreContext);
    const {skus} = props
    const [currentIndex, setCurrentIndex] = useState(0)
    const skuIds = skus?.map(item => item.id) || []

    useEffect(() => {
        if (activeSkuId) {
            setCurrentIndex(skuIds.indexOf(activeSkuId))
        }
    }, [activeSkuId])

    return (
        <div className="col-md-5">
            <div className="tns-outer" id="tns1-ow">
                <div id="tns1-mw" className="tns-ovh">
                    <div className="tns-inner" id="tns1-iw">
                        <div
                            className="tiny-single-item  tns-slider tns-carousel tns-subpixel tns-calc tns-horizontal"
                            id="tns1">
                            {skus?.map((sku, index) => {
                                return (
                                    <div id={`tns1-item${index}`}
                                         key={`tns1-item${index}`}
                                         className={`tiny-slide tns-item ${currentIndex === index ? 'show' : 'hide'}`}
                                         style={{display: currentIndex !== index ? 'none' : false}}
                                         tabIndex={-1}><img src={sku.image}
                                                            className="img-fluid rounded"/></div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="tns-nav" aria-label="Carousel Pagination">
                    {
                        skus?.map((sku, index) => {
                            return (
                                <button key={`product-${index}-image`}
                                        type="button"
                                        data-nav={index}
                                        aria-controls="tns1"
                                        className={`${currentIndex === index ? 'tns-nav-active' : ''}`}
                                        onClick={() => setCurrentIndex(index)}
                                        aria-label="Carousel Page 1" tabIndex={-1}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductSlides
