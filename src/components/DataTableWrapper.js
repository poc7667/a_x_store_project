import React, {useReducer, useState } from "react";
export const DataTableWrapper = ({definitions, items: rows, children}) => {
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
                    {children}
                </tbody>
            </table>
        </div>
    )
}
