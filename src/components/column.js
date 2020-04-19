import React, { Component } from 'react';
import classes from '../styles/style.module.css';

class Column extends Component{
    constructor(props){
        super(props);
        this.state = {
            values: []
        }
    }
    componentDidMount(){
        console.log(this.props.value)
        this.setState({
            values: this.props.value
        })
    }
 
    onDragStart = (event, colName) => {
    	console.log('dragstart on col: ', colName);
    	event.dataTransfer.setData("colName", colName);
	}
	onDragOver = (event) => {
	    event.preventDefault();
    }
    onDrop = (event) => {
        let colName = event.dataTransfer.getData("colName");
        console.log(colName)
	   
	}

    render(){
     return (

        <div className={classes.pointer}
             onDragStart = {(event) => this.onDragStart(event, this.props.title)}
		     draggable>
          <h4>{this.props.title}</h4>
        </div>
    );
}
}
export default Column;