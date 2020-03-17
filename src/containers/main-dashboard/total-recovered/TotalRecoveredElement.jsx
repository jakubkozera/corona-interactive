import React from 'react';
import { Link } from 'react-router-dom'
export default function TotalRecoveredElement({ recovered }) {

    return (
        <Link to={'/country/' + recovered.countryRoute}>
            <div className="recovered-element">
             <span className="amount"><b>{recovered.recovered}</b> recovered</span>
                <br />
                {recovered.country}
            </div>
        </Link>

    )
}