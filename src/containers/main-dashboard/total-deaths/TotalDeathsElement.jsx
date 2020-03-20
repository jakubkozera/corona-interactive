import React from 'react';
import { Link } from 'react-router-dom'

export default function TotalDeathsElement({ death }) {
    return (
        <Link to={'/country/' + death.countryRoute}>
            <div className="death-element">
                <span className="amount"><b>{death.deaths}</b> deaths</span>
                <br />
                {death.country} 
            </div>
        </Link>
    )
}