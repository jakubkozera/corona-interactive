import React from 'react';
import './TotalConfirmed.css'
import { useSelector } from 'react-redux';
import { selectConfirmed } from '../../../app/redux/reducers/Total'
export default function TotalConfirmed() {
    const totalConfirmed = useSelector(selectConfirmed);
    return (
        <div class="total-confirmed">
            <div class="label">Total Confirmed</div>
            <div class="amount">{totalConfirmed}</div>
        </div>
    )
}