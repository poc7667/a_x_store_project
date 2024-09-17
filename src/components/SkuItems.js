import { useContext, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../store/storeReducer";

const SkuItems = (props) => {
    const {storeState: {activeSkuId}} = useContext(StoreContext);
    const {activeProduct, skus, updateSelectedSkuHandler} = props
    const [skuItems, setSkuItems] = useState([])
    useEffect(() => {
        if (skus) {
            setSkuItems(skus.map(item => {
                const {
                    product_id,
                    image,
                    id,
                    title,
                    price,
                    stock
                } = item;

                return {
                    product_id,
                    image,
                    id,
                    title,
                    price,
                    stock
                }
            }))
        }
    }, [skus])

    return (
        <div className="d-flex align-items-center">
            <h6 className="mb-0">Choose</h6>
            <ul className="list-unstyled mb-0 ms-3">
                {
                    skuItems.map(item => {
                        return (
                            <li className="list-inline-item" key={`sku-item-li-${item.id}`}>
                                <Link
                                    key={`sku-item-li-link-${item.id}`}
                                    to={`#`}
                                    onClick={() => updateSelectedSkuHandler(item)}
                                    style={{width: 'auto', margin: 5, paddingLeft: 5, paddingRight: 5}}
                                    className={`btn btn-icon ${item.id !== activeSkuId ? 'btn-soft-primary' : 'btn-soft-warning'}`}> {item.title}
                                </Link>
                            </li>
                        )
                    })
                }

            </ul>
        </div>
    )
}

export default SkuItems
