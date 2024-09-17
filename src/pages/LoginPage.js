import { useContext, useEffect, useState } from "react";
import { Constants } from "../Constants";
import { StoreContext } from "../store/storeReducer";
import { LoginForm } from "../components/LoginForm";
import Action from "../constants/Action";
import { Redirect, useHistory } from "react-router-dom";

const LoginPage = () => {
    const history = useHistory();

    const {storeState, dispatch} = useContext(StoreContext);
    const {user, customers} = storeState;
    const [loginState, setLoginState] = useState(false);
    const [email, setEmail] = useState(false);
    const [hasError, setHasError] = useState(false);


    useEffect(async () => {
        if (loginState) {
            dispatch({
                type: Action.login,
                payload: {email}
            });
        }
    }, [loginState])

    useEffect(() => {
        if (user.id) {
            history.push('/products');
        }
    }, [user])

    const loginHandler = (email) => {
        const customer = Object.values(customers).filter(user => user.email === email)?.[0]
        if (customer) {
            setEmail(email);
            setLoginState(true);
            setHasError(false);
        }
        {
            setHasError(true);
        }
    }

    return (
        <div className="component-wrapper rounded shadow">
            {hasError &&
            <div className="alert alert-danger" role="alert"> Wrong login info </div>
            }

            <LoginForm
                clickLoginHandler={loginHandler}
                title={`User Login`}/>
        </div>
    )
}

export default LoginPage;
