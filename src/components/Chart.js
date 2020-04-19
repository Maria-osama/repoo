import React, { PureComponent } from 'react';
import { Line } from 'react-chartjs-2';

class Chart extends PureComponent {

    shouldComponentUpdate(nextPrpos, nextState) {

        return true;

    }

    render() {
        const chartData = {
            labels: this.props.productValues,
            datasets: [
                {
                    label: "Chart",
                    data: this.props.costValues,
                    backgroundColor: ['transparent']

                }
            ]
        }
       /* console.log("the arrays passed to Chart:")
        console.log(this.props.productValues)
        console.log(this.props.costValues)
        console.log(this.state.chartData)*/
        
        return (
            <div className="chart">
                <Line
                    data={chartData}
                    options={{
                        scales: {
                            yAxes: [{
                                scaleLabel: {
                                    display : true,
                                    labelString: this.props.yAxisLabel
                                }
                            }],
                            xAxes: [{
                                scaleLabel: {
                                    display : true,
                                    labelString: this.props.xAxisLabel
                                }
                            }]
                        }
                    }}
                />
            </div>
        )
    }
}

export default Chart;