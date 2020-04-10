import React from 'react';
import TotalConfirmed from './total-confirmed/TotalConfirmed';
import ConfirmedCases from './confirmed-cases/ConfirmedCases';
import MainMap from './map/MainMap';
import TotalDeaths from './total-deaths/TotalDeaths';
import TotalRecovered from './total-recovered/TotalRecovered';
import MainChart from './main-chart/MainChart';

export default function MainDashboard() {

    return (
        <div className="main-container">
            <div className="left-panel pile block">
                <TotalConfirmed />
                <ConfirmedCases />
            </div>
            <div className="main-panel">
                <div className="main-first-row">
                    <MainMap />
                    <div className="totals pile">
                        <TotalDeaths />
                        <TotalRecovered />
                    </div>
                </div>



                <div className="main-chart block">
                    <MainChart />
                </div>
            </div>

        </div>
    )
}