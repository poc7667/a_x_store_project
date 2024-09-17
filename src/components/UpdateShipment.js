import useInput from "../hooks/useInput";
import { utils } from "../utils";

const UpdateShipment = (props) => {
    const {employees, dataRow, orderId, selectedShipment: {id: shipmentId}, selectedShipment, orderStatus} = props;
    const [selectedEmployeeId, setEmployeeId] = useInput();

    const updateShipment = async () => {
        const {recipient, shippingAddress} = selectedShipment;
        const response = utils.putRequest({
            order_id: orderId,
            employee_id: selectedEmployeeId,
            recipient: recipient,
            shippingAddress: shippingAddress
        }, `/shipments/${shipmentId}/`)
        props.updateShipment(response);
    }

    const postDelivery = async () => {
        const response = utils.postRequest({
            shipment_id: parseInt(shipmentId),
            order_id: orderId
        }, `/deliveries/`)
        props.addDelivery(response);
    }
    return (
        <>
            {(orderStatus === 'paid' || orderStatus === 'new') &&
            <div className="row">
                <div className="col-md-6 input-group">
                    <select className="form-select form-control" aria-label="Default select example"
                            onChange={setEmployeeId}>
                        <option selected>Select employee</option>
                        {employees.map(employee => <option key={employee.id}
                                                           value={employee.id}>{employee.firstName} {employee.lastName}</option>)}
                    </select>

                    <a type="button" id="submit" name="send" className="btn btn-primary" defaultValue="Send Message"
                       onClick={(e) => {
                           e.preventDefault();
                           updateShipment();
                       }}
                    >
                        Update Employee
                    </a>
                </div>
            </div>
            }
            {orderStatus === 'shipped' &&
                <div className="row">
                    <div className="col-md-6 input-group">
                        <a type="button" id="submit" name="send" className="btn btn-primary" defaultValue="Send Message"
                           onClick={(e) => {
                               e.preventDefault();
                               postDelivery();
                           }}
                        >
                            Make delivered
                        </a>
                    </div>
                </div>
            }

        </>
    )
}
export default UpdateShipment;
