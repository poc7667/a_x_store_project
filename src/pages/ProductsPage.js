import { useContext } from "react";
import ProductGrid from "../components/productGrid";
import { StoreContext } from "../store/storeReducer";

const ProductsPage = () => {
    const {storeState: {products, skus}} = useContext(StoreContext);
    if (!Object.values(skus).length) {
        return (<></>);
    }
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h5 className="mb-0">Most Viewed Products</h5>
                </div>
                {/*end col*/}
            </div>
            <div className="row">
                {
                    products.map(product => {
                        return (
                            <ProductGrid product={product} skus={skus[product.id]}/>
                        )
                    })
                }
            </div>
        </>
    )
}

export default ProductsPage;
