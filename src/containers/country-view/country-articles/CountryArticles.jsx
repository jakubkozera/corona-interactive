import React from 'react'
import { useSelector } from 'react-redux'
import { selectCountryArticles } from '../../../app/redux/reducers/CountryArticle'
import countryNameFromRoute from '../../../utils/countryNameFromRoute'
import './CountryArticles.css'
import CountryArticle from './country-article/CountryArticle'
import { Link } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'

export default function CountryArticles({ country }) {

    const countryArticles = useSelector(selectCountryArticles(country))
    const countryName = countryNameFromRoute(country)
    return (
        <div className="country-articles pile block">
            <div class="country-articles-heading">
                <Link to="/" className="back-to-main-view">
                    <button class="ui basic button">
                        <i class="icon arrow left"></i>
                        Back to main view
                    </button>
                </Link>

                <h2>
                    {countryName} COVID-19 articles:
                </h2>
            </div>
            <hr />
            <div className="country-articles-container">
                {(countryArticles && countryArticles.map((article, index) => { return <CountryArticle article={article} key={index} /> }))}
                {(!countryArticles && (<Loader style={{ marginTop: '40px' }} active inline='centered' />))}
            </div>
        </div>
    )
}
