import React from 'react';
import './ConfirmedCaseElement.css'
export default function ConfirmedCaseElement({confirmedCase}) {
    return (
        <div className="confirmed-case">
            <div className="amount"><b>{confirmedCase["confirmed"]}</b></div>
            <div className="label">{confirmedCase["country"]}</div>
        </div>
    )
}