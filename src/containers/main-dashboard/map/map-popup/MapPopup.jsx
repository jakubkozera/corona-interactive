import React from 'react'
import { Popup } from 'react-leaflet'
import './MapPopup.css'
import { Link } from 'react-router-dom'

export default function MapPopup({ country, state, confirmed, deaths, recovered, countryRoute }) {

    return (
        <Popup>
            <Link to={'/country/' + countryRoute}>
                <div className="map-popup">
                    <div className="country-name">
                        {country} {state && ([{ state }])}
                    </div> 
                    <div className="confirmed">
                        <div className="label">Confirmed</div>
                        <div className="amount">{confirmed}</div>
                    </div>
                    <div style={{clear: 'both'}}></div>
                    <div className="recovered">
                        <div className="label">Recovered</div>
                        <div className="amount">{recovered}</div>
                    </div>
                    <div style={{clear: 'both'}}></div>
                    
                    <div className="deaths">
                        <div className="label">Deaths</div>
                        <div className="amount">{deaths}</div>
                    </div>
                </div>
            </Link>
        </Popup>
    )
}