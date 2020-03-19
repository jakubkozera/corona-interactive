import React from 'react';
import './TotalRecovered.css'
import _ from 'lodash';
import { useSelector } from 'react-redux'
import { selectRecovered, selectCountryCases } from '../../../app/redux/reducers/Total'
import TotalRecoveredElement from './TotalRecoveredElement';
export default function TotalRecovered() {

    const countryCases = useSelector(selectCountryCases)
    const recoveredCountryCases = _.orderBy(countryCases, 'recovered', 'desc').filter(cc => cc.recovered > 0).map(cc => ({ country: cc.country, recovered: cc.recovered, countryRoute: cc.countryRoute  }))
    const recovered = useSelector(selectRecovered)

    return (
        <div className="total-recovered block">
            <div className="label">Total Recovered </div>
            <div className="amount">{recovered}</div>
            <div className="total-recovered-list"> 
            {
                recoveredCountryCases.map((value, index) => {
                    return <TotalRecoveredElement key={index} recovered={value}/>
                })
            } 
            </div>
        </div>
    )
}