import { useContext, useEffect, useReducer, useState } from "react";
import useInput from "../hooks/useInput";
import Action from "../constants/Action";
import { StoreContext, storeReducer } from "../store/storeReducer";
import { Constants } from "../Constants";
import { utils } from "../utils";

const ProductReviews = (props) => {
    const {dispatch} = useContext(StoreContext);
    const {productReviews, selectedSku} = props;
    const [reviewScore, setReviewScore] = useState(-1)
    const [reviewEnabled, setReviewEnabled] = useState(false)
    const [reviewComment, setReviewComment] = useInput();
    const [email, setEmail] = useInput();
    const [name, setName] = useInput();

    useEffect(() => {
        if (reviewScore >= 0) {
            setReviewEnabled(true);
        } else {
            setReviewEnabled(false);
        }
    }, [reviewScore])



    const submitReviewHandler =  () => {
        // product = models.ForeignKey(Product, on_delete=models.CASCADE)
        // sku = models.ForeignKey(Sku, on_delete=models.CASCADE)
        // score = models.IntegerField()
        // comment = models.TextField()
        // customer = models.ForeignKey(Customer, on_delete=models.CASCADE)


        utils.postRequest({
            customer_id: '1',
            nickname: name,
            product_id: selectedSku.product_id.toString(),
            sku_id: selectedSku.id.toString(),
            score: reviewScore+1,
            comment: reviewComment,
        }, `/reviews/`).then(response=> {
            console.log(response);
            dispatch({
                type: Action.addReview, payload: response
            })
        })


        // Clear review
        setReviewScore(-1);
        setReviewComment('');
        setEmail('');
        setName('');
    }

    return (
        <div className="container mt-100 mt-60">
            <div className="row">
                <div className="col-12">
                    <div className="tab-content mt-5" id="pills-tabContent">
                        <div className="card border-0 tab-pane fade active show" id="review" role="tabpanel"
                             aria-labelledby="review-comments">
                            <div className="row">
                                <div className="col-lg-6">
                                    <ul className="media-list list-unstyled mb-0">
                                        {productReviews.map(review => {
                                            return (
                                                <li>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex align-items-center">

                                                            <div className="flex-1 commentor-detail">
                                                                {review?.title &&
                                                                <small
                                                                    className="text-muted">{review.title} </small>
                                                                }

                                                            </div>
                                                        </div>
                                                        <ul className="list-unstyled mb-0">
                                                            {[...Array(review.score)].map((_, index) => {
                                                                return (
                                                                    <li className="list-inline-item"
                                                                        key={`star-${index}`}><i
                                                                        className="mdi mdi-star text-warning"/></li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </div>
                                                    <div className="mt-3">
                                                        <p className="text-muted fst-italic p-3 bg-light rounded">{review.comment}</p>
                                                    </div>
                                                </li>
                                            )
                                        })
                                        }

                                    </ul>
                                </div>
                                {/*end col*/}
                                <div className="col-lg-6 mt-4 mt-lg-0 pt-2 pt-lg-0">
                                    <form className="ms-lg-4">
                                        <div className="row">
                                            <div className="col-12">
                                                <h5>Add your review:</h5>
                                            </div>
                                            <div className="col-12 mt-4">
                                                <h6 className="small fw-bold">Your Rating:</h6>
                                                {[...Array(5)].map((_, numOfStars) => {
                                                    return (
                                                        <a href={``} onClick={(e) => {
                                                            setReviewScore(numOfStars)
                                                            e.preventDefault()
                                                        }}
                                                           className={`d-inline-block me-3 review ${reviewScore === numOfStars ? 'active' : ''}`}>
                                                            <ul className="list-unstyled mb-0 small">
                                                                {[...Array(5)].map((_, index) => {
                                                                    if (index <= numOfStars) {
                                                                        return <li className="list-inline-item"><i
                                                                            className="mdi mdi-star text-warning"/>
                                                                        </li>;
                                                                    }
                                                                    return <li className="list-inline-item"><i
                                                                        className="mdi mdi-star-outline  text-warning"/>
                                                                    </li>;
                                                                })}
                                                            </ul>
                                                        </a>

                                                    )
                                                })}

                                            </div>
                                            <div className="col-md-12 mt-3">
                                                <div className="mb-3">
                                                    <label className="form-label">Your Review:</label>
                                                    <div className="form-icon position-relative">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}
                                                             viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                             strokeWidth={2} strokeLinecap="round"
                                                             strokeLinejoin="round"
                                                             className="feather feather-message-circle fea icon-sm icons">
                                                            <path
                                                                d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                                                        </svg>
                                                        <textarea id="message"
                                                                  placeholder={`${reviewEnabled ? 'Put your comment' : 'Please choose stars first'}`}
                                                                  rows={5}
                                                                  disabled={!reviewEnabled}
                                                                  value={reviewComment}
                                                                  onChange={(e) => setReviewComment(e)}
                                                                  name="message" className="form-control ps-5" required
                                                                  defaultValue={""}/>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*end col*/}
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Name <span
                                                        className="text-danger">*</span></label>
                                                    <div className="form-icon position-relative">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}
                                                             viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                             strokeWidth={2} strokeLinecap="round"
                                                             strokeLinejoin="round"
                                                             className="feather feather-user fea icon-sm icons">
                                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                                            <circle cx={12} cy={7} r={4}/>
                                                        </svg>
                                                        <input
                                                            disabled={!reviewEnabled}
                                                            value={name}
                                                            onChange={(e) => setName(e)}
                                                            id="name" name="name" type="text" placeholder="Name"
                                                            className="form-control ps-5" required/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="send d-grid">
                                                    <button onClick={submitReviewHandler}
                                                            disabled={!reviewEnabled || !name} type="submit"
                                                            className="btn btn-primary">Submit
                                                    </button>
                                                </div>
                                            </div>
                                            {/*end col*/}
                                        </div>
                                        {/*end row*/}
                                    </form>
                                    {/*end form*/}
                                </div>
                                {/*end col*/}
                            </div>
                            {/*end row*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductReviews;
