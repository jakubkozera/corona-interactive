import React, { useRef, useState } from 'react';
import './ConfirmedCases.css'
import { useSelector } from 'react-redux';
import ConfirmedCaseElement from './confirmed-case-element/ConfirmedCaseElement';
import { selectCountryCases } from '../../../app/redux/reducers/Total'

export default function ConfirmedCases() {

    const [searchValue, setSearchValue ] = useState('');


    const searchInput = useRef(null);
    const data = useSelector(selectCountryCases);
    
    return (
        <div className="confirmed-cases">
            <div className="label">Confirmed Cases by Country:</div>
            <div className="search ui icon input">
                <input 
                    onChange={() => setSearchValue(searchInput.current.value)}
                    className="search-input" 
                    ref={searchInput} 
                    placeholder="Search" 
                    type="text" />
                <i aria-hidden="true" className="search icon"></i>
            </div>
            <hr />
            <div className="list">
                {data.filter(d => d.country.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) >= 0).map((value, index) => {
                    return <ConfirmedCaseElement key={index} confirmedCase={value}/>
                })}
            </div>
        </div>
    )
}