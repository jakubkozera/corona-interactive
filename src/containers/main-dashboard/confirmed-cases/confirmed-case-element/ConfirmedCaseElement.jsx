import React from 'react';
import './ConfirmedCaseElement.css'
import { Link } from 'react-router-dom'

export default function ConfirmedCaseElement({ confirmedCase }) {

    return (
        <Link to={'/country/' + confirmedCase.countryRoute}>
            <div className="confirmed-case">
                <div className="amount"><b>{confirmedCase["confirmed"]}</b></div>
                <div className="label">{confirmedCase["country"]}</div>
            </div>
        </Link>
    )
}