import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import React from 'react';

const BarChart = () => {
    const options: any = {
        chart: {
            type: 'column',
        },
        title: {
            text: '',
        },
        series: [
            {
                name: '',
                data: [10.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.5, 194.1, 95.6, 54.4],
            },
        ],
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default BarChart;
