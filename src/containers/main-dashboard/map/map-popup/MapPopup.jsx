import React from 'react'
import { Popup } from 'react-leaflet'
import './MapPopup.css'
export default function MapPopup({ country, state, confirmed, deaths, recovered }) {

    return (
        <Popup>
            <div className="map-popup">
                {country} {state && ([{ state }])} <br />
                <span className="confirmed">• {confirmed} Confirmed</span> <br />
                <span className="recovered">• {recovered} Recovered</span> <br />
                <span className="deaths">• {deaths} Deaths</span>
            </div>
        </Popup>
    )
}