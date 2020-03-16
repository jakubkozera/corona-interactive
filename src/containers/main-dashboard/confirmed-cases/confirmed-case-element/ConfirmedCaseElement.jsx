import React from 'react';
import './ConfirmedCaseElement.css'
export default function ConfirmedCaseElement({confirmedCase}) {
    console.log(confirmedCase)

    return (
        <div className="confirmed-case">
            <div className="amount">{confirmedCase["confirmed"]}</div>
            <div className="label">{confirmedCase["country"]}</div>
        </div>
    )
}