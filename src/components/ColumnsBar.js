import React, { Component } from 'react';
import classes from '../styles/style.module.css';
import Column from './column';

class CoulmnsBar extends Component {
    constructor(props){
super(props);
this.state = {
    names : [],
    values: []
}
    }



  render(){
    return(
        <div className={classes.CoulmnsBar}>
         <h3 className={classes.columnsTitle}>Columns</h3>


         {this.props.AllData.map((x) => {
            console.log(this.props.postData[0])
             return(  
               <Column 
                  title={x.name}
                  func={x.function}
                  value={ [] }
                />
             )
         })}
         

        </div>
    )
}
}
export default CoulmnsBar;