import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';
import MainDashboard from './containers/main-dashboard/MainDashboard';
import computeDailyReport from './utils/dailyReport'
import {computeTimeSeriesReport, computeDeathsTimeSeriesReport, computeRecoveredTimeSeriesReport} from './utils/timeSeriesReport'
import { csv } from 'd3'
import { confirmed, deaths, recovered, countryCases } from './app/redux/reducers/Total'
import { chinaConfirmed, otherLocationConfirmed, dataLoaded, deathsConfirmed, recoveredConfirmed } from './app/redux/reducers/Daily'
import {  Router, Route } from 'react-router-dom'
import CountryDashboard from './containers/country-view/CountryDashboard';


function App({history}) {

  const dispatch = useDispatch();
  const rootFolderLocation = window.location.pathname.length > 1 ? "../" : ""

  console.log('app')
  useEffect(() => {
    csv(rootFolderLocation + 'data/daily_reports/03-13-2020.csv')
      .then(recentReport => {
        const {
          dailyConfirmed,
          dailyDeaths,
          dailyRecovered,
          dailyCountryCases
        } = computeDailyReport(recentReport);

        dispatch(confirmed(dailyConfirmed));
        dispatch(deaths(dailyDeaths));
        dispatch(recovered(dailyRecovered));
        dispatch(countryCases(dailyCountryCases));

      })


      csv(rootFolderLocation + 'data/time_series/time_series_19-covid-Deaths.csv')
      .then(deathsSeries => {
        const { deathsResult } = computeDeathsTimeSeriesReport(deathsSeries);

      dispatch(deathsConfirmed(deathsResult))

      })

      csv(rootFolderLocation + 'data/time_series/time_series_19-covid-Recovered.csv')
      .then(timeSeries => {
        const { recoveredResult } = computeRecoveredTimeSeriesReport(timeSeries);

       dispatch(recoveredConfirmed(recoveredResult))
      })

      csv(rootFolderLocation + 'data/time_series/time_series_19-covid-Confirmed.csv')
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
      <Router history={history}>
        <Route exact path="/" component={MainDashboard} />
        <Route exact path="/country/:country" component={CountryDashboard} />
      </Router>
      
      {/* <MainDashboard /> */}
    </div>
  );
}

export default App;
