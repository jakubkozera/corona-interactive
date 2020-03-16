import React from 'react'
import { render } from 'react-dom'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import './MainMap.css'
import 'leaflet/dist/leaflet.css';
export default function MainMap(){
    const position = [51.505, 25.09]

    return (
        <div className="map-container">
            <Map style={{ width: '100%', height: '94.6vh' }} center={position} zoom={4}>
                <TileLayer
                   
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                </Marker>
            </Map>
        </div>

    )
}