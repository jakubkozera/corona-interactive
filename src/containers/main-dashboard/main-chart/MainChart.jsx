import React from 'react';
import _ from 'lodash';
import moment from 'moment'
import { useSelector } from 'react-redux'
import { selectChinaConfirmed, selectOtherLocationConfirmed, selectDeathsConfirmed, selectRecoveredConfirmed, selectAllDataLoaded } from '../../../app/redux/reducers/Daily'
import { ResponsiveLine } from '@nivo/line'


export default function MainChartContainer() {
  const chartReady = useSelector(selectAllDataLoaded) 
  return (chartReady && <MainChart/>)

}

function MainChart() {

    const chinaConfrimedDailyCases = useSelector(selectChinaConfirmed)
    const otherLocationConfrimedDailyCases = useSelector(selectOtherLocationConfirmed)
    const deathsConfrimedDailyCases = useSelector(selectDeathsConfirmed)
    const recoveredConfrimedDailyCases = useSelector(selectRecoveredConfirmed)

    let data = getDataForChart(chinaConfrimedDailyCases, otherLocationConfrimedDailyCases, deathsConfrimedDailyCases, recoveredConfrimedDailyCases)
    return ( <MyResponsiveLine data={data} /> )
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

function getDataForChart(china, other, deaths, recovered) {
  let data = [{
    id: "China [Confirmed]",
    data: dataObjectToArray(china)
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