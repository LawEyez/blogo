import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label
} from 'recharts'

const Chart = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
        width='100%'
        height='100%'
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 25
        }}
      >
        <XAxis dataKey='title'>
          <Label offset={10} position='bottom' value='Posts' fill='#fff' />
        </XAxis>
        <YAxis scale='auto' />
        <Tooltip labelClassName='swatch-2 txt-capitalize' cursor={{ fill: '#161616'}} viewBox={{ background: 'red'}} />
        <Legend verticalAlign='top' align='right'  />
        <Bar dataKey='reads' fill='#fa4242' barSize={20} name='Reads' />
        {/* <Bar dataKey='uv' fill='#fa4242' /> */}
      </BarChart>
    </ResponsiveContainer>
  )
}

export default Chart