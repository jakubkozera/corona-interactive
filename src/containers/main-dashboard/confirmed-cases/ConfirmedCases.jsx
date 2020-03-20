import React from 'react';
import './ConfirmedCases.css'
import { useSelector } from 'react-redux';
import ConfirmedCaseElement from './confirmed-case-element/ConfirmedCaseElement';
import { selectCountryCases } from '../../../app/redux/reducers/Total'

export default function ConfirmedCases() {

    const data = useSelector(selectCountryCases);
    return (
        <div className="confirmed-cases">
            <div className="label">Confirmed Cases by <br />Country/Region/Sovereignty</div>
            <div className="list">
                {data.map((value, index) => {
                    return <ConfirmedCaseElement key={index} confirmedCase={value}/>
                })}
            </div>
        </div>
    )
}