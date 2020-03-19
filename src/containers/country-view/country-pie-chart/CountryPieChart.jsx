import React from 'react'
import { useSelector } from 'react-redux'
import { selectCountrySpecificCases } from '../../../app/redux/reducers/Total'
import './CountryPieChart.css'
import { ResponsivePie } from '@nivo/pie'

export default function CountryPieChart({ country }) {


    const countryData = useSelector(selectCountrySpecificCases(country))

    const chartReady = countryData !== undefined;
    let pieData = []

    if (chartReady) {
        pieData = getPieData(countryData);
    }

    return (
        <div className="country-pie-chart block pile">
            {chartReady && (<div className="label">{countryData.country} total confirmed: {countryData.confirmed}</div>)}
            {chartReady &&
                <div className="chart-container">
                    <div className="chart">
                        <CountryResponsivePie data={pieData} />
                    </div>
                    <div className="country-info">
                        <div className="recovery-ratio tag">
                            Recovery ratio: {(countryData.recovered / countryData.confirmed).toFixed(3)} %
                        </div>
                        <br /><br />
                        <div class="death-ratio tag">
                            Death ratio: {(countryData.deaths / countryData.confirmed).toFixed(3)} %
                        </div>

                    </div>
                </div>
            }
        </div>
    )
}


function getPieData(countryData) {

    const data = [{
        id: 'Deaths',
        label: 'Deaths',
        value: countryData.deaths,
        color: 'red'
    }, {
        id: 'Active',
        label: 'Active',
        value: (countryData.confirmed - countryData.deaths - countryData.recovered)
    }, {
        id: 'Recovered',
        label: 'Recovered',
        value: countryData.recovered,
    }];


    return data;
}

const CountryResponsivePie = ({ data /* see data tab */ }) => (
    <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 90, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        colors={{ scheme: 'pastel1' }}
        cornerRadius={3}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={8}
        radialLabelsLinkHorizontalLength={8}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: 'color' }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                translateY: 56,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
)