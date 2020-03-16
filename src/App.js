import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';
import MainDashboard from './containers/main-dashboard/MainDashboard';
import computeDailyReport from './utils/dailyReport'
import { csv } from 'd3'
import { confirmed, deaths, recovered, countryCases } from './app/redux/reducers/Total'


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    csv('data/daily_reports/03-13-2020.csv')
      .then(recentReport => {
        console.log("report")
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
  }, [])


  return (
    <div className="App">
      <MainDashboard />
    </div>
  );
}

export default App;
