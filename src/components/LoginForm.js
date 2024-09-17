import useInput from "../hooks/useInput";

export const LoginForm = (props) => {
    const [email, setEmail] = useInput();
    return (
        <div className="card-body">
            <h4 className="card-title text-center">{props.title}</h4>
            <form className="login-form mt-4">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <label className="form-label">Your Email <span className="text-danger">*</span></label>
                            <div className="form-icon position-relative">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-user fea icon-sm icons"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx={12} cy={7} r={4} /></svg>
                                <input type="email" className="form-control ps-5" placeholder="Email" name="email"
                                       value={email}
                                       onChange={(e) => setEmail(e)}
                                       required />
                            </div>
                        </div>
                    </div>{/*end col*/}
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <label className="form-label">Password <span className="text-danger">*</span></label>
                            <div className="form-icon position-relative">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-key fea icon-sm icons"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" /></svg>
                                <input type="password" className="form-control ps-5" placeholder="Password" required />
                            </div>
                        </div>
                    </div>{/*end col*/}
                    <div className="col-lg-12 mb-0">
                        <div className="d-grid">
                            <button className="btn btn-primary" onClick={(e)=>{
                                e.preventDefault();
                                props.clickLoginHandler(email);
                            }
                            }>Sign in</button>
                        </div>
                    </div>{/*end col*/}
                </div>{/*end row*/}
            </form>
        </div>

    )
}
