import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addCountryArticles } from '../../app/redux/reducers/CountryArticle'
import './CountryDashboard.css'
import CountryPieChart from './country-pie-chart/CountryPieChart';
import CountryGraph from './country-graph/CountryGraph';
import CountryArticles from './country-articles/CountryArticles'
import CountryGrid from './country-grid/CountryGrid'
export default function CountryDashboard({ match }) {

    const dispatch = useDispatch();
    const country = match.params.country;

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://covidinteractive.azurewebsites.net/api/covidnews?country=" + country, requestOptions)
            .then(response => response.text())
            .then(articles => {
                dispatch(addCountryArticles({ country, articles: JSON.parse(articles.split("&#39;").join("")) }))
            })
            .catch(error => console.log('error', error));
    }, [country, dispatch])

    return (
        <>
            <div className="country-dashboard">
                <CountryArticles country={country} />
                <div className="country-dashboard-content">
                    <CountryPieChart country={country} />
                    <CountryGraph country={country} />
                    <CountryGrid country={country} />
                </div>
            </div>
        </>
    )
}