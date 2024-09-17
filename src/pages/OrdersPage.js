import { useContext, useEffect, useState } from "react";
import { SchemaDefinition } from "../schemaDefinition";
import { Constants } from "../Constants";
import { DataTableRows } from "../components/DataTableRows";
import { StoreContext } from "../store/storeReducer";

const OrdersPage = () => {
    const {storeState, dispatch} = useContext(StoreContext);
    const {user} = storeState;
    const [orders, setOrders] = useState([])

    const fetchData =async () =>{
        const orders = await fetch(Constants.SERVER_URL + `/orders`).then(data => data.json());
        setOrders(orders);
        return setTimeout(fetchData, 1500);
    }

    useEffect(async () => {
        const timeoutId = await fetchData()
        // clearTimeout(timeoutId);
    }, [])

    return (
        <div className="component-wrapper rounded shadow">
            <div className="p-4 border-bottom">
                <h4 className="title mb-0"> Your Recent Orders</h4>
            </div>
            <div className="p-4">
                <div className="row pt-2">
                    <div className="col-12">
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane active" id="pills-cloud" role="tabpanel"
                                 aria-labelledby="pills-cloud-tab">
                                <DataTableRows items={orders.filter(order => user.id == order.customer_id)}
                                               definitions={SchemaDefinition.orders}/>
                            </div>
                            {/*end teb pane*/}
                        </div>
                        {/*end tab content*/}
                    </div>
                    {/*end col*/}
                </div>
                {/*end row*/}
            </div>
        </div>
    )
}

export default OrdersPage;
