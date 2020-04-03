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
    let uniqueKey = 0;
    for (let i = 0; i < data.length; i++) {
        const d = data[i];
        const lat = isNaN(d.lat) ? 0 : d.lat;
        const long = isNaN(d.long) ? 0 : d.long;
        uniqueKey++;
        if (d.states.length === 0) {
            markers.push(
                (<CircleMarker key={uniqueKey} center={[lat, long]} color="orange" radius={calculateRadious(d.confirmed, zoomLevel)}>
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
                uniqueKey++;
                const state = d.states[j];
                const lat = isNaN(state.lat) ? 0 : state.lat;
                const long = isNaN(state.long) ? 0 : state.long;
                markers.push(
                    (<CircleMarker key={uniqueKey} center={[lat, long]} color="orange" radius={calculateRadious(state.confirmed, zoomLevel)}>
                        <MapPopup 
                            country={`${d.country} [${state.name}]`}
                            countryRoute={d.countryRoute}
                            confirmed={state.confirmed}
                            recovered={state.recovered}
                            deaths={state.deaths}
                    />
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