import React from 'react';

export default function TotalRecoveredElement({ recovered }) {
    return (
        <div className="recovered-element">
             <span className="amount"><b>{recovered.recovered}</b> recovered</span>
             <br />
            {recovered.country} 
        </div>
    )
}