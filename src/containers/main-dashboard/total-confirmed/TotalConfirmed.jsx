import React from 'react';
import './TotalConfirmed.css'
import { useSelector } from 'react-redux';
import { selectConfirmed } from '../../../app/redux/reducers/Total'
export default function TotalConfirmed() {
    const totalConfirmed = useSelector(selectConfirmed);
    return (
        <div className="total-confirmed">
            <div className="label">Total Confirmed</div>
            <div className="amount">{totalConfirmed}</div>
        </div>
    )
}