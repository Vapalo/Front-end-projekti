import React, { useState } from 'react'

function Customerlist() {
    const [customer, setCustomer] = useState([])

    const custUrl = "https://customerrest.herokuapp.com/api/customers"

    const getCustomers = () => {
        fetch(custUrl)
        .then(res => res.json())
        .then(data => setCustomer(data.content))
        console.log(customer)
    }

    

    return (
        <div>
            <h1>Tämä on customerlist</h1>

            <table>
                <thead>
            <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>City</th>
            </tr>
            </thead>
            <tbody>
            {customer.map((cust, index) => (
                <tr key={index}>
                    <td>{cust.firstname}</td>
                    <td>{cust.lastname}</td>
                    <td>{cust.city}</td>
                </tr>
            ))}
            </tbody>
            </table>
            <button onClick={getCustomers}>Get customers</button>
        </div>
    )
}

export default Customerlist
