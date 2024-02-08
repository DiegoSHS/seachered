import React from 'react'
import { Context } from '../context'

export default function App({ Component, props }) {
    return (
        <Context>
            <Component {...props} />
        </Context>
    )
}
