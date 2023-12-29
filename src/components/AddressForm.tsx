import { AddressElement } from '@stripe/react-stripe-js'
import React from 'react'

const AddressForm = () => {
    return (
        <div>
            <h3>Address Form</h3>
            <AddressElement options={{mode:"shipping"}}
            onChange={(e) => {
                if (e.complete) {
                    const address = e.value.address
                }
            }}/>
        </div>
    )
}

export default AddressForm