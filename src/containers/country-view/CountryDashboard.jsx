import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCountrySpecificCases } from '../../app/redux/reducers/Total'
import { addCountryArticles } from '../../app/redux/reducers/CountryArticle'
import './CountryDashboard.css'
import CountryPieChart from './country-pie-chart/CountryPieChart';
import CountryGraph from './country-graph/CountryGraph';
import CountryArticles from './country-articles/CountryArticles'
export default function CountryDashboard({ match }) {

    const dispatch = useDispatch();
    const country = match.params.country;

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("https://covid-19-news.azurewebsites.net/api/Function1?country=" + country, requestOptions)
            .then(response => response.text())
            .then(articles => {
                dispatch(addCountryArticles({country, articles: JSON.parse(articles.split("&#39;").join(""))}))
            })
            .catch(error => console.log('error', error));
    }, [])

    return (
    <div class="country-dashboard">
        <CountryArticles country={country} />
        <CountryPieChart country={country} />
        <CountryGraph country={country}/>
    </div>
    )
}