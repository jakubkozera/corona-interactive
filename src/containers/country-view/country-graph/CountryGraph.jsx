import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './CountryGraph.css'
import moment from 'moment'
import _ from 'lodash'
import { selectCountryDailyReport, selectAllDataLoaded } from '../../../app/redux/reducers/Daily'
import { Loader } from 'semantic-ui-react'
import { ResponsiveLine } from '@nivo/line'
import CountryBarChart from './CountryBarChart'

export default function CountryGraphContainer({ country }) {
    const dataLoaded = useSelector(selectAllDataLoaded);

    return (
        <div className="block pile country-graph">
            {(dataLoaded ? (<CountryGraph country={country} />) : (<Loader style={{ marginTop: '40px' }} active inline='centered' />))}
        </div>
    )

}
function CountryGraph({ country }) {
    const countryDailyReport = useSelector(selectCountryDailyReport(country))


    const [data] = useState(getGraphData(countryDailyReport))
    const [barChartData] = useState(getBarChartData(countryDailyReport))
    const [visibleChartDataData, setVisibleChartDataData] = useState(barChartData)
    const [visibleGraphData, setVisibleGraphData] = useState(data)
    const [activeButton, setActiveButton] = useState('all')
    const [activeChart, setActiveChart] = useState('bar')

    const onClick = period => {
        setVisibleGraphData(getVisibleData(data, period))
        setVisibleChartDataData(getVisibleBarChartData(barChartData, period))

        setActiveButton(period)
    }

    const onChartChange = chart => {


        setActiveChart(chart)
    }

    return (
        <>
            <div className="ui buttons" style={{ float: 'left', paddingLeft: '1vw'}}>
                <button onClick={() => onChartChange('bar')}
                    className={"ui button " + (activeChart === 'bar' ? 'active' : '')}>
                    Daily cases
                </button>
                <button onClick={() => onChartChange('chart')}
                    className={"ui button " + (activeChart === 'chart' ? 'active' : '')} >
                    Total cases
                </button>
            </div>
            <div className="ui buttons">
                <button onClick={() => onClick('all')}
                    className={"ui button " + (activeButton === 'all' ? 'active' : '')}>
                    All dates
                </button>
                <button onClick={() => onClick('7days')}
                    className={"ui button " + (activeButton === '7days' ? 'active' : '')} >
                    Last 7 days
                </button>
                <button onClick={() => onClick('30days')} 
                    className={"ui button " + (activeButton === '30days' ? 'active' : '')}>
                    Last 30 days
                </button>
            </div>


            <div style={{ height: '85%' }}>
                {activeChart === 'bar' && (<CountryBarChart data={visibleChartDataData} />) }
                {activeChart === 'chart' && (<MyResponsiveLine data={visibleGraphData} period={activeButton} />)}
            </div>
        </>
    )
}

function getVisibleData(data, period){
    switch(period) {
        case 'all':
            return data;
        case '7days':
            return data.map(d => ({ id: d.id, data: _.takeRight(d.data, 7)}))
        case '30days':
            return data.map(d => ({ id: d.id, data: _.takeRight(d.data, 30)}))
        default:
            return data;
    }

}
function getVisibleBarChartData(data, period){
    switch(period) {
        case 'all':
            return data;
        case '7days':
            return  _.takeRight(data, 7)
        case '30days':
            return _.takeRight(data, 30)
        default:
            return data;
    }

}

function getBarChartData(countryDailyReport){
    var dataProps = Object.getOwnPropertyNames(countryDailyReport.confirmed).slice(3);

    let barChartData = []
    
    for(var i = 1; i < dataProps.length; i++){
        barChartData.push({
            date: moment(dataProps[i], 'MM-DD-YY').format('MM-DD'),
            deaths: countryDailyReport.deaths[dataProps[i]] - countryDailyReport.deaths[dataProps[i - 1]],
            confirmed: countryDailyReport.confirmed[dataProps[i]] - countryDailyReport.confirmed[dataProps[i-1]]
        })
    }
    return barChartData;
}

function getGraphData(countryDailyReport) {
    let data = [
        {
            id: "Deaths",
            data: dataObjectToArray(countryDailyReport.deaths)
        },
        {
            id: "Confirmed",
            data: dataObjectToArray(countryDailyReport.confirmed)
        },

    ];

    return data;
}

function dataObjectToArray(data) {
    var result = [];
    var dataProps = Object.getOwnPropertyNames(data).slice(3);

    for (let i = 0; i < dataProps.length; i++) {
        result.push(
            {
                x: moment(dataProps[i], 'MM-DD-YY').format('YYYY-MM-DD'),
                y: data[dataProps[i]]
            }
        )
    }

    return result;
}
const MyResponsiveLine = ({ data, period }) => (
    <ResponsiveLine
        data={data}
        margin={{ top: 30, right: 20, bottom: 50, left: 40 }}
        xScale={{ type: 'time', format: '%Y-%m-%d', precision: 'day', }}
        xFormat="time:%Y-%m-%d"
        axisTop={null}
        axisRight={null}
        sliceTooltip={renderToolTip}
        enableSlices="x"
        colors={{ scheme: 'pastel1' }}
        axisBottom={{
            format: '%b %d',
            tickValues: period === 'all' ? 'every 1 months' :'every 10 days',
            legendOffset: -12,
        }}
        axisLeft={{
            orient: 'left',
            format: v => v > 1000 ? `${Math.floor(v / 1000)} k` : v,
            tickSize: 1,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        useMesh={true}
        pointSize={4}
        pointBorderWidth={2}
        pointLabel="y"
        pointLabelYOffset={-12}
        legends={[
            {
                anchor: 'bottom-left',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 47,
                itemsSpacing: 35,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)

function renderToolTip(toolTipData) {
    const { slice } = toolTipData
    return (
        <div
            style={{
                background: 'white',
                padding: '9px 12px',
                border: '1px solid #ccc',
            }}
        >
            <div>Date: {slice.points[0].data.xFormatted}</div>
            {slice.points.map(point => (
                <div
                    key={point.id}
                    style={{
                        color: point.serieColor,
                        padding: '3px 0',
                    }}
                >
                    <strong>{point.serieId}</strong> [{point.data.yFormatted}]
                </div>
            ))}
        </div>
    )
}