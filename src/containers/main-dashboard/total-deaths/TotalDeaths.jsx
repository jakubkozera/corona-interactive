import React from 'react';
import './TotalDeaths.css'
import _ from 'lodash';
import { useSelector } from 'react-redux'
import { selectDeaths, selectCountryCases } from '../../../app/redux/reducers/Total'
import TotalDeathsElement from './TotalDeathsElement';
export default function TotalDeaths() {

    const countryCases = useSelector(selectCountryCases)
    const deaths = useSelector(selectDeaths)
    const deathsCountryCases = _.orderBy(countryCases, 'deaths', 'desc').filter(cc => cc.deaths > 0).map(cc => ({ country: cc.country, deaths: cc.deaths, countryRoute: cc.countryRoute }))

    return (
        <div className="total-deaths block">
            <div className="label">Total Deaths </div>
            <div className="amount">{deaths}</div>
            <div className="total-death-list">
                {deathsCountryCases.map((value, index) => {
                    return <TotalDeathsElement key={index} death={value} />
                })} 
            </div>
        </div>
    )
}