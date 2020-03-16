import React from 'react';
import TotalConfirmed from './total-confirmed/TotalConfirmed';
import ConfirmedCases from './confirmed-cases/ConfirmedCases';
import MainMap from './map/MainMap';
import TotalDeaths from './total-deaths/TotalDeaths';
import TotalRecovered from './total-recovered/TotalRecovered';

export default function MainDashboard() {

    return (
        <div className="main-container">
            <div className="left-panel pile block">
                <TotalConfirmed />
                <ConfirmedCases />
            </div>
            <div className="main-panel pile block">
                <MainMap />
            </div>
            <div className="right-panel pile">
                <div className="totals">
                    <TotalDeaths />
                    <TotalRecovered />
                </div>
                <div className="main-graph block">
                {/* <TotalDeaths /> */}

                </div>
            </div>
        </div>
    )
}