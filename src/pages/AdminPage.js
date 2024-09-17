import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../store/storeReducer";
import { LoginForm } from "../components/LoginForm";
import { DataTableRows } from "../components/DataTableRows";
import { Constants } from "../Constants";
import { SchemaDefinition } from "../schemaDefinition";
import UpdateShipment from "../components/UpdateShipment";
import { DataTableWrapper } from "../components/DataTableWrapper";
import Moment from 'react-moment';

const toTitle = (name) => {
    return name[0].toUpperCase() + name.slice(1);
}

const AdminPage = () => {
    const {storeState: {products, skus}} = useContext(StoreContext);
    const [auth, setAuth] = useState('');
    const [section, setSection] = useState('');
    const [activeSectionName, setSectionName] = useState('orders');
    useEffect(() => {
        if (auth) {
            console.log(auth);
        }
    }, [auth])

    const adminLoginHandler = () => {
        setAuth(true)
    }

    const [order, setOrder] = useState(null)

    // Load data

    const [orders, setOrders] = useState([])
    const [shipments, setShipments] = useState([])
    const [deliveries, setDeliveries] = useState([])
    const [employees, setEmployees] = useState([])
    const [payments, setPayments] = useState([])
    const [customers, setCustomers] = useState([])

    const updateShipment = (response) => {
        loadData()
        // setShipments(shipments.map(item => {
        //     if (item.id === response.id) {
        //         item.employee_id = response.employee_id;
        //         item.shipDate = response.shipDate;
        //     }
        //     return item;
        // }))
    }

    const addDelivery = (response) => {
        loadData()
    }

    const loadData = async () => {
        setTimeout(() => {
            Object.keys(SchemaDefinition).map(async sectionName => {
                const data = await fetch(Constants.SERVER_URL + '/' + sectionName).then(data => data.json());
                eval(`set${toTitle(sectionName)}(data)`)
            })
        }, 200)
    }

    useEffect((async () => {
        await loadData()
    }), []);

    const renderContent = () => {
        const items = eval(activeSectionName);
        switch (activeSectionName) {
            case 'orders':
                return (
                    <DataTableWrapper items={items}
                                      definitions={SchemaDefinition[activeSectionName]}>
                        {
                            eval(activeSectionName).map(record => {
                                let buttonClassName = 'bg-primary';
                                if (record.status==='delivered'){
                                    buttonClassName = 'bg-success';
                                }
                                if (record.status==='shipped'){
                                    buttonClassName = 'bg-info';
                                }
                                return (
                                    <tr key={record.id}>
                                        <td>
                                            {record.id}

                                        </td>
                                        <td>
                                            {record.customer_id}
                                        </td>
                                        <td>
                                            <Moment format="YYYY/MM/DD">
                                                {new Date(record.orderedDate)}
                                            </Moment>
                                        </td>
                                        <td>
                                            <span className={`badge ${buttonClassName}`}>
                                                {toTitle(record.status)}
                                            </span>
                                        </td>
                                        <td>
                                            {record.price}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </DataTableWrapper>
                )
            case 'shipments':
                return (
                    <DataTableWrapper items={items}
                                      definitions={SchemaDefinition[activeSectionName]}>
                        {
                            eval(activeSectionName).map(record => {
                                let buttonClassName = 'bg-primary';
                                if (record.order_status==='delivered'){
                                    buttonClassName = 'bg-success';
                                }
                                if (record.order_status==='shipped'){
                                    buttonClassName = 'bg-info';
                                }
                                return (
                                    <tr key={record.id}>
                                        <td>
                                            {record.id}

                                        </td>
                                        <td>
                                            {record.order_id}
                                        </td>
                                        <td>
                                            {record.employee_id}
                                        </td>
                                        <td>
                                            {record.shipDate}
                                        </td>
                                        <td>
                                            <span className={`badge ${buttonClassName}`}>
                                                {toTitle(record.order_status)}
                                            </span>
                                        </td>
                                        <td>
                                            <UpdateShipment
                                                selectedShipment={record}
                                                orderStatus={record.order_status}
                                                orderId={record.order_id}
                                                employees={employees}
                                                updateShipment={updateShipment}
                                                addDelivery={addDelivery}
                                            />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </DataTableWrapper>
                )
            default:
                return (
                    <DataTableRows items={eval(activeSectionName)}
                                   definitions={SchemaDefinition[activeSectionName]}/>
                )
        }

    }


    return (
        <>
            {!auth && <LoginForm clickLoginHandler={adminLoginHandler} title={`Admin Login`}/>}
            {auth && <div className="component-wrapper rounded shadow">
                <div className="p-4 border-bottom">
                    <h4 className="title mb-0"> Dashboard</h4>
                </div>
                <div className="p-4">
                    <div className="row">
                        <div className="col-lg-12">
                            <ul className="nav nav-pills nav-justified flex-column flex-sm-row rounded"
                                id="pills-tab"
                                role="tablist">
                                {
                                    Object.keys(SchemaDefinition).map(sectionName => {
                                        return (
                                            <li className="nav-item">
                                                <a className={`nav-link rounded ${sectionName === activeSectionName ? 'active' : ''}`}
                                                   id={`pills-cloud-tab-${sectionName}`}
                                                   data-bs-toggle="pill"
                                                   onClick={() => {
                                                       setSectionName(sectionName)
                                                   }} role="tab" aria-controls="pills-cloud"
                                                   aria-selected={sectionName === activeSectionName}>
                                                    <div className="text-center py-2">
                                                        <h6 className="mb-0">{toTitle(sectionName)}</h6>
                                                    </div>
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            {/*end nav pills*/}
                        </div>
                        {/*end col*/}
                    </div>
                    {/*end row*/}
                    <div className="row pt-2">
                        <div className="col-12">
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane active" id="pills-cloud" role="tabpanel"
                                     aria-labelledby="pills-cloud-tab">
                                    {renderContent()}
                                </div>
                                {/*end teb pane*/}
                            </div>
                            {/*end tab content*/}
                        </div>
                        {/*end col*/}
                    </div>
                    {/*end row*/}
                </div>
            </div>}
        </>
    )
}

export default AdminPage;
