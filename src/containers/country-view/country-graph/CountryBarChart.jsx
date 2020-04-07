import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

export default function CountryBarChart({data}) {
    return (
        <MyResponsiveBar data={data} />
    )
}


const MyResponsiveBar = ({ data }) => (
    <ResponsiveBar
        data={data}
        keys={[ 'deaths', 'confirmed' ]}
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
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'top-left',
                direction: 'row',
                justify: false,
                translateX: 10,
                translateY: -15,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
)