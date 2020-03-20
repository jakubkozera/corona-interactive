import React from 'react'
import { Popup } from 'react-leaflet'
import './MapPopup.css'
import { Link } from 'react-router-dom'

export default function MapPopup({ country, state, confirmed, deaths, recovered, countryRoute }) {

    return (
        <Popup>
            <Link to={'/country/' + countryRoute}>

                <div className="map-popup">
                    {country} {state && ([{ state }])} <br />
                    <span className="confirmed">• {confirmed} Confirmed</span> <br />
                    <span className="recovered">• {recovered} Recovered</span> <br />
                    <span className="deaths">• {deaths} Deaths</span>
                </div>
            </Link>
        </Popup>
    )
}