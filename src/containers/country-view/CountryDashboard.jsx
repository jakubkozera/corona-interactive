import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectCountrySpecificCases } from '../../app/redux/reducers/Total'
import './CountryDashboard.css'
import CountryPieChart from './country-pie-chart/CountryPieChart';
export default function CountryDashboard({ match }) {
    
    const country = match.params.country;

    const countryData = useSelector(selectCountrySpecificCases(country))

    console.log('countryData')
    console.log(countryData)
    return (<div class="country-dashboard">
        <CountryPieChart country={country} />
    </div>)
}