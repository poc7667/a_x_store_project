import Moment from 'react-moment';
import React, {useReducer, useState } from "react";
export const DataTableRows = ({definitions, items: rows, children}) => {
    return (
        <div className="table-responsive bg-white shadow rounded">
            <table className="table mb-0 table-center table-nowrap">
                <thead>
                <tr>
                    {definitions.map(def =>
                        <th scope="col" className="border-bottom">{def.title}</th>
                    )}
                </tr>
                </thead>
                <tbody>
                {
                    rows.map(dataRow => {
                        const childrenWithProps = React.Children.map(children, child => {
                            // checking isValidElement is the safe way and avoids a typescript error too
                            if (React.isValidElement(child)) {
                                return React.cloneElement(child, {definitions, dataRow});
                            }
                            return child;
                        });
                        return (
                            <tr>
                                {definitions.map(def => {
                                    if (dataRow[def.value] && def.title.toString().toLowerCase().includes('date')) {
                                        return <td scope="text-success" className="border-bottom">
                                            <Moment format="YYYY/MM/DD HH:mm:ss">
                                                {new Date(dataRow[def.value])}
                                            </Moment>
                                        </td>
                                    } else {
                                        return <td scope="text-success"
                                                   className="border-bottom"> {dataRow[def.value]}</td>
                                    }
                                })}
                                {childrenWithProps}
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}
