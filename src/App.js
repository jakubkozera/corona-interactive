import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';
import MainDashboard from './containers/main-dashboard/MainDashboard';
import computeDailyReport from './utils/dailyReport'
import computePerCountryReport from './utils/perCountryReport'
import {computeTimeSeriesReport, computeDeathsTimeSeriesReport, computeRecoveredTimeSeriesReport} from './utils/timeSeriesReport'
import { csv } from 'd3'
import { confirmed, deaths, recovered, countryCases } from './app/redux/reducers/Total'
import { chinaConfirmed, otherLocationConfirmed, dataLoaded, deathsConfirmed, recoveredConfirmed } from './app/redux/reducers/Daily'


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    csv('data/daily_reports/03-13-2020.csv')
      .then(recentReport => {
        const {
          dailyConfirmed,
          dailyDeaths,
          dailyRecovered,
          dailyCountryCases
        } = computeDailyReport(recentReport);

        const { casesPerCountry } = computePerCountryReport(recentReport);


        dispatch(confirmed(dailyConfirmed));
        dispatch(deaths(dailyDeaths));
        dispatch(recovered(dailyRecovered));
        dispatch(countryCases(dailyCountryCases));

      })


      csv('data/time_series/time_series_19-covid-Deaths.csv')
      .then(deathsSeries => {
        const { deathsResult } = computeDeathsTimeSeriesReport(deathsSeries);

      dispatch(deathsConfirmed(deathsResult))

      })

      csv('data/time_series/time_series_19-covid-Recovered.csv')
      .then(timeSeries => {
        const { recoveredResult } = computeRecoveredTimeSeriesReport(timeSeries);

       dispatch(recoveredConfirmed(recoveredResult))
      })

      csv('data/time_series/time_series_19-covid-Confirmed.csv')
        .then(deathsSeries => {
          const {
            chinaResult,
            otherLocationResult
        } = computeTimeSeriesReport(deathsSeries);

        dispatch(chinaConfirmed(chinaResult))
        dispatch(otherLocationConfirmed(otherLocationResult))
        dispatch(dataLoaded(true))
      })



  }, [])

  


  return (
    <div className="App">
      <MainDashboard />
    </div>
  );
}

export default App;
