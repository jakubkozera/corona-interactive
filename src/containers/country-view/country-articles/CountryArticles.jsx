import React from 'react'
import { useSelector } from 'react-redux'
import { selectCountryArticles } from '../../../app/redux/reducers/CountryArticle'
import './CountryArticles.css'
import CountryArticle from './country-article/CountryArticle'
export default function CountryArticles({ country }) {

    const countryArticles = useSelector(selectCountryArticles(country))

    return (
        <div className="country-articles pile block">
            {(countryArticles  && countryArticles.map((article, index) => { return <CountryArticle article={article} key={index} /> }))}
        </div>
    )
}
