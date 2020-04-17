import React from 'react';
import _ from 'lodash';
import moment from 'moment'
import { useSelector } from 'react-redux'
import { selectUsConfirmed, selectOtherLocationConfirmed, selectDeathsConfirmed, selectRecoveredConfirmed, selectAllDataLoaded } from '../../../app/redux/reducers/Daily'
import { ResponsiveLine } from '@nivo/line'
import { ResponsiveBar } from '@nivo/bar'
import { Tab } from 'semantic-ui-react'
import './MainChart.css'


export default function MainChartContainer() {
  const panes = [
    { menuItem: 'Cases', render: () => <Tab.Pane attached={false}><MainChart/></Tab.Pane> },
    { menuItem: 'Daily new cases', render: () => <Tab.Pane attached={false}><BarChartWrapper keyType="confirmed" /></Tab.Pane> },
    { menuItem: 'Daily confirmed deaths', render: () => <Tab.Pane attached={false}><BarChartWrapper keyType="deaths" /></Tab.Pane> },
  ]
  
  const chartReady = useSelector(selectAllDataLoaded) 

  return (chartReady && <Tab menu={{ borderless: true, secondary: true, pointing: true }} panes={panes} />)

}

function BarChartWrapper({keyType}){
  const chinaConfrimedDailyCases = useSelector(selectUsConfirmed)
  const otherLocationConfrimedDailyCases = useSelector(selectOtherLocationConfirmed)
  const deathsConfrimedDailyCases = useSelector(selectDeathsConfirmed)

  const data = keyType === 'confirmed' ? getDailyConfirmed(chinaConfrimedDailyCases, otherLocationConfrimedDailyCases) : getDailyDeaths(deathsConfrimedDailyCases) 

  console.log('barchartwarpper data:')
  console.log(data)
  return (<div className="bar-chart-container"><MyResponsiveBar data={data} keyType={keyType} /></div>)

}
function  getDailyDeaths(deathsConfrimedDailyCases){
  var dataProps = Object.getOwnPropertyNames(deathsConfrimedDailyCases);
  let barChartData = []
  
  for(var i = 1; i < dataProps.length; i++){
      barChartData.push({
          date: moment(dataProps[i], 'MM-DD-YY').format('MM-DD'),
          deaths: deathsConfrimedDailyCases[dataProps[i]] - deathsConfrimedDailyCases[dataProps[i-1]]
      })
  }
  return barChartData;

}
function getDailyConfirmed(chinaConfrimedDailyCases, otherLocationConfrimedDailyCases){
  var dataProps = Object.getOwnPropertyNames(chinaConfrimedDailyCases);

  let barChartData = []
  
  for(var i = 1; i < dataProps.length; i++){

    const totalCurrentDate = chinaConfrimedDailyCases[dataProps[i]] + otherLocationConfrimedDailyCases[dataProps[i]]
    const totalPreviousDay = chinaConfrimedDailyCases[dataProps[i-1]] + otherLocationConfrimedDailyCases[dataProps[i-1]]
      barChartData.push({
          date: moment(dataProps[i], 'MM-DD-YY').format('MM-DD'),
          confirmed: totalCurrentDate - totalPreviousDay
      })
  }
  return barChartData;
}

const MyResponsiveBar = ({ data, keyType }) => (
  <ResponsiveBar
      data={data}
      keys={[ keyType ]}
      indexBy="date"
      margin={{ top: 50, right: 20, bottom: 30, left: 50 }}
      padding={0.3}
      groupMode="grouped"
      colors={{ scheme: 'pastel1' }}

      borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -40,
          legendPosition: 'middle',
          legendOffset: 32
      }}
      axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: 'middle',
          legendOffset: -40
      }}
      enableLabel={false}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
  />
)
function MainChart() {

    const usConfrimedDailyCases = useSelector(selectUsConfirmed)
    const otherLocationConfrimedDailyCases = useSelector(selectOtherLocationConfirmed)
    const deathsConfrimedDailyCases = useSelector(selectDeathsConfirmed)
    const recoveredConfrimedDailyCases = useSelector(selectRecoveredConfirmed)
    console.log('mainchart')
    let data = getDataForChart(usConfrimedDailyCases, otherLocationConfrimedDailyCases, deathsConfrimedDailyCases, recoveredConfrimedDailyCases)
    console.log(data)
    return ( <div class="chart-container"> <MyResponsiveLine data={data} /> </div>)
}

const MyResponsiveLine = ({ data }) => (
    <ResponsiveLine
        data={data}
        margin={{ top: 30, right: 20, bottom: 50, left: 40 }}
        xScale={{ type: 'time', format: '%Y-%m-%d', precision: 'day', }}
        xFormat="time:%Y-%m-%d"
        axisTop={null}
        axisRight={null}
        enableSlices="x"
        colors={{ scheme: 'category10' }}
        sliceTooltip={renderToolTip}
        axisBottom={{
            format: '%b %d',
            tickValues: 'every 1 months',
            legendOffset: -12,
        }}
        axisLeft={{
            orient: 'left',
            format: v => v > 1000 ? `${Math.floor(v/1000)} k` : '0',
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

function getDataForChart(us, other, deaths, recovered) {
  let data = [{
    id: "United States [Confirmed]",
    data: dataObjectToArray(us)
  },
{
  id: "Others [Confirmed]",
  data: dataObjectToArray(other)
},  {
    id: "Recovered",
    data: dataObjectToArray(recovered)
  }, {
    id: "Deaths",
    data: dataObjectToArray(deaths)
  },]

return data;
}

// moment('21/2/20', 'DD-MM-YY').format('YYYY-MM-DD')
function dataObjectToArray(data) {
  var result = [];
  var dataProps = Object.getOwnPropertyNames(data);

  for(let i = 0; i < dataProps.length; i++) {
    result.push(
      {
        x: moment(dataProps[i], 'MM-DD-YY').format('YYYY-MM-DD'),
        y: data[dataProps[i]]
      }
    )
  }

  return result;
}

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