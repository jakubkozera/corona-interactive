import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Map, Popup, TileLayer, CircleMarker, } from 'react-leaflet'
import './MainMap.css'
import { selectCountryCases } from '../../../app/redux/reducers/Total'
import 'leaflet/dist/leaflet.css';
import MapPopup from './map-popup/MapPopup'
export default function MainMap() {
    const position = [51.505, 25.09]

    const [zoomLevel, setZoomLevel] = useState(4);
    const onZoomEnd = (e) => {
        setZoomLevel(e.target._zoom)
    }
    const countryData = useSelector(selectCountryCases)
    const markers = getMarkers(countryData, zoomLevel)
    return (
        <div className="map-container">
            <Map
                style={{ width: '100%', height: '94.6vh' }}
                center={position}
                onZoomEnd={onZoomEnd}
                zoom={4}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {
                    markers
                }
            </Map>
        </div>

    )
}

function getMarkers(data, zoomLevel) {
    let markers = [];

    for (let i = 0; i < data.length; i++) {
        const d = data[i];
        if (d.states.length === 0) {
            markers.push(
                (<CircleMarker center={[d.lat, d.long]} color="orange" radius={calculateRadious(d.confirmed, zoomLevel)}>
                    <MapPopup 
                        country={d.country}
                        countryRoute={d.countryRoute}
                        confirmed={d.confirmed}
                        recovered={d.recovered}
                        deaths={d.deaths}
                    />

                </CircleMarker>))
        } else {
            for(let j = 0; j < d.states.length; j++) {
                const state = d.states[j];
                markers.push(
                    (<CircleMarker center={[state.lat, state.long]} color="orange" radius={calculateRadious(state.confirmed, zoomLevel)}>
                        <Popup>{d.country} [{state.name}]</Popup>
                    </CircleMarker>))
            }
        }
    }
    return markers;
}

function calculateRadious(casesCountry, zoomLevel) {
    const radiusConst = .9;

    return radiusConst * Math.log(casesCountry) * zoomLevel
}