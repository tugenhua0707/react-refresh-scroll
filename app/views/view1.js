
import React from 'react'
import ReactDOM from 'react-dom'

import ReactRefresh from '../common/reactRefresh';

export default class View1 extends ReactRefresh {
  constructor(props) {
    super(props);
  }
  render() {
    var data = this.props.data;
    var cells;
    if(data && data.length) {
      cells = data.map((item,index)=>{
        return <p key={index} className="">{index+item.text}</p>
      })
    }
    return(
      <div className="tableView" onScroll={this.viewDidScroll}>
        {cells}
      </div>
    )
  }
}