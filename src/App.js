import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart';
import axios from 'axios';
import classes from './styles/style.module.css';
import Coulmn from './components/column';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coulmnsData: [],
      postData: {},
      chartData: {
        labels: []
      },
      currentDimensionCol: '',
      currentMeasuresCol: '',
      targetColumnFunction: '',
      targetColumnValues: null,
      topDraggedColIndex: 0,
      bottomDraggedColIndex: 1,
      initTop: [],
      initBottom: [],
      yAxisLabel: '',
      xAxisLabel: ''



    }

  }

  componentDidMount() {
    axios.get('https://plotter-task.herokuapp.com/columns')
      .then(response => {
        this.setState({ coulmnsData: response.data })
      })

    axios.post('https://plotter-task.herokuapp.com/data', {
      "measures": ["Cost"],
      "dimension": "Product"
    })
      .then(response => {
        this.setState({ postData: response.data })
      }, (error) => {
        console.log(error);
      });
  }

  onClearClickHandller(e) {
    const button = e.target;
    //Get currentText
    const currentText = button.nextSibling.innerHTML;
    // Get indexOf currentText
    const colIndex = this.state.coulmnsData.findIndex(post => {// index in columns
      return post.name === currentText
    })
    // Get The full record of the currentText
    const fullRecord = {...this.state.coulmnsData[colIndex]}
    const recordFunc = fullRecord.function

    if(recordFunc == 'dimension'){
      this.setState({
        initTop : [],
        xAxisLabel: ''
      })
    }else {
      this.setState({
        initBottom : [],
        yAxisLabel: ''
      })
    }

    button.nextSibling.innerHTML = '';
    

  }
  onDragStart = (event, colName) => {
    console.log('dragstart on col: ', colName);
    event.dataTransfer.setData("colName", colName);
  }
  onDragOver = (event) => {
    event.preventDefault();
  }
  onDrop = (event) => {

    /////// Get the name of the dragged column
    let colName = event.dataTransfer.getData("colName");  // Name


    /////// Get the index of the dragged column
    const colIndex = this.state.coulmnsData.findIndex(post => {// index in columns
      return post.name === colName
    })

    /////// Get the Function of the dragged column
    const targetColumn = {...this.state.coulmnsData[colIndex]}
    const targetColumnFunc = targetColumn.function
    this.setState({targetColumnFunction : targetColumnFunc}) // Function

    event.target.innerHTML = colName;

    /////// Get the index of the dragged column from [Data array]
    const colValueIndex = this.state.postData.findIndex(post => {
      return post.name === colName
    })

    /////// Get the values of this column
    if(colValueIndex > -1){
    const targetColumnAllValues = {...this.state.postData[colValueIndex]};
    const targetColumnValue = targetColumnAllValues.values;
    
    if(targetColumnFunc == 'dimension'){
      this.setState({
        initTop : targetColumnValue,
        xAxisLabel : colName,
       })
    }else{
      this.setState({
        initBottom : targetColumnValue,
        yAxisLabel: colName})
    }


    }else{alert("This column has no values")}
    

  }

  shouldComponentUpdate(){
     return true
  }


  render() {
    if (this.state.postData.length) {
      var cols = this.state.coulmnsData.map(col => {

        return (
          <Coulmn
            title={col.name}
            func={col.function}
            value={col.name == "Product" ? this.state.postData[0].values
              : col.name == "Cost" ? this.state.postData[1].values : []}


          />
        )
      })
    }

    return (
      <div className="App">

        <section className={classes.CoulmnsBar}>
          {cols}
        </section>

        {this.state.postData.length > 0 ?
          <section className={classes.chartSection}>
            <div className={classes.inputContainer}>
              <label>Dimension</label>
              <button id="1" className={classes.clearBtn} onClick={(event) => this.onClearClickHandller(event)}>Clear</button>
              <div className={classes.displyBlock, classes.textArea}
                onDragOver={(event) => this.onDragOver(event)}
                onDrop={(event) => this.onDrop(event)}></div>
            </div>

            <div className={classes.inputContainer}>
              <label>Measures</label>
              <button id="2" className={classes.clearBtn} onClick={(event) => this.onClearClickHandller(event)}>Clear</button>
              <div className={classes.displyBlock, classes.textArea}
                onDragOver={(event) => this.onDragOver(event)}
                onDrop={(event) => this.onDrop(event)}></div>
            </div>
             
             
            <Chart productValues={this.state.initTop}
                   costValues={this.state.initBottom}
                   xAxisLabel={this.state.xAxisLabel}
                   yAxisLabel={this.state.yAxisLabel}
            />

          </section>
          : <section></section>}
      </div>
    );
  }
}
export default App;
