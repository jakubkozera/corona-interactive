import React from 'react'
import './CountryGrid.css'
import { AgGridReact } from 'ag-grid-react';
import { useSelector } from 'react-redux'
import { selectCountryDetailedDailyReport, selectAllDataLoaded } from '../../../app/redux/reducers/Daily'
import { Loader } from 'semantic-ui-react'

export default function CountryGridContainer({ country }) {
    const dataLoaded = useSelector(selectAllDataLoaded);

    return (
        <div className="country-grid block pile">
            {(dataLoaded ? (<CountryGrid country={country} />) : (<Loader style={{ marginTop: '40px' }} active inline='centered' />))}
        </div>
    )
}

function CountryGrid({ country }) {

    const onGridReady = params => {
        params.api.sizeColumnsToFit();
    };

    const countryDetailedDailyReport = useSelector(selectCountryDetailedDailyReport(country))

    const columnDefs = [
        { headerName: "Date", field: "date", sort: 'desc', filter: true },
        { headerName: "Confirmed", field: "confirmed" },
        { headerName: "Active", field: "active" },
        { headerName: "Recovered", field: "recovered" },
        { headerName: "Deaths", field: "deaths" },
        { headerName: "+ Confirmed", field: "newConfirmed" },
        { headerName: "+ Recovered", field: "newRecovered" },
        { headerName: "+ Deaths", field: "newDeaths" },        
        { headerName: "Recovery ratio", field: "recoveryRatio", sortable: false, },
        { headerName: "Death ratio", field: "deathRatio", sortable: false },
    ]

    return (
        <div className="country-grid" >
            <h3>All collected data</h3>
            <br />
            <div className="ag-theme-balham grid-wrapper">
                <AgGridReact
                    defaultColDef={{ resizable: true, sortable: true, sortingOrder: ['desc', 'asc', null] }}
                    columnDefs={columnDefs}
                    animateRows={true}
                    rowData={countryDetailedDailyReport}
                    onGridReady={onGridReady}>
                </AgGridReact>
            </div>

        </div>
    )
}
