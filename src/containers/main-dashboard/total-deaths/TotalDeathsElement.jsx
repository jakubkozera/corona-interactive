import React from 'react';

export default function TotalDeathsElement({ death }) {
    return (
        <div className="death-element">
             <span className="amount"><b>{death.deaths}</b> deaths</span>
             <br />
            {death.country} 
        </div>
    )
}