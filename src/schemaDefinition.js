export const SchemaDefinition =  {
    'orders': [
        {
            "title": "Orders number",
            "value": "id"
        },
        {
            "title": "Users Id",
            "value": "customer_id"
        },
        {
            "title": "Date",
            "value": "orderedDate"
        },
        {
            "title": "Status",
            "value": "status"
        },
        {
            "title": "Total",
            "value": "price"
        }
    ],
    'shipments': [
        {
            "title": "id",
            "value": "id"
        },
        {
            "title": "order",
            "value": "order_id"
        },
        {
            "title": "employee id",
            "value": "employee_id"
        },
        // {
        //     "title": "recipient",
        //     "value": "recipient"
        // },
        // {
        //     "title": "recipientPhone",
        //     "value": "recipientPhone"
        // },
        // {
        //     "title": "shippingAddress",
        //     "value": "shippingAddress"
        // },
        {
            "title": "shipDate",
            "value": "shipDate"
        },
        {
            "title": "status",
            "value": "order_status"
        }
    ],
    'deliveries': [
        {
            "title": "id",
            "value": "id"
        },
        // {
        //     "title": "shipment",
        //     "value": "shipment_id"
        // },
        // {
        //     "title": "employee id",
        //     "value": "employee_id"
        // },
        {
            "title": "order id",
            "value": "order_id"
        },
        {
            "title": "deliveredDate",
            "value": "deliveredDate"
        }
    ],
    'employees': [
        {
            "title": "id",
            "value": "id"
        },
        {
            "title": "firstName",
            "value": "firstName"
        },
        {
            "title": "lastName",
            "value": "lastName"
        },
        {
            "title": "phone",
            "value": "phone"
        },
        {
            "title": "email",
            "value": "email"
        }
    ],
    'payments': [
        {
            "title": "id",
            "value": "id"
        },
        {
            "title": "order",
            "value": "order_id"
        },
        {
            "title": "method",
            "value": "method"
        },
        {
            "title": "paidDate",
            "value": "paidDate"
        },
        {
            "title": "billingAddress",
            "value": "billingAddress"
        }
    ]
}
