import PropTypes from 'prop-types';


const ProductPropType = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    lowestPrice: PropTypes.number.isRequired
}

const SkuPropType = {
    id: PropTypes.string.isRequired,
    product_id: PropTypes.string.isRequired,
    size: PropTypes.string,
    color: PropTypes.string,
    style: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired
}

const CustomerPropType = {
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string,
    email: PropTypes.string,
}


const ReviewPropType = {
    id: PropTypes.string,
    product_id: PropTypes.string,
    skuId: PropTypes.string,
    userId: PropTypes.string,
    score: PropTypes.number,
    comment: PropTypes.string,
}

const CartPropType = {
    product_id: PropTypes.string,
    sku: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired
};


export const initialStoreState = {
    isLoading: true,
    user: {},
    activeProduct: {},
    activeSkuId: null,
    products: [],
    skus:{},
    customers: {},
    reviews: {},
    cart: {},
    shippingCost: 10
}

initialStoreState.PropTypes = {
    isLoading: PropTypes.bool,
    user: PropTypes.shape({
        name: PropTypes.string
    }),
    activeProduct: ProductPropType,
    activeSkuId: PropTypes.string,
    products: PropTypes.arrayOf(ProductPropType),
    customers: PropTypes.objectOf(CustomerPropType),
    skus: PropTypes.objectOf(PropTypes.arrayOf(SkuPropType)),
    reviews: PropTypes.objectOf(PropTypes.arrayOf(ReviewPropType)),
    cart: CartPropType,
    shippingCost: PropTypes.number
}
