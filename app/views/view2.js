import React from 'react'
import ReactDOM from 'react-dom'

import ReactRefresh from '../common/reactRefresh';

export default class View2 extends ReactRefresh {
  constructor(props) {
    super(props);
  }
  render() {
    var data = this.props.data;
    var cells;
    if(data && data.length) {
      cells = data.map((item,index)=>{
        return <p key={index} className="">{item.text}</p>
      })
    }
    return (
      <div className="tableView" onScroll={this.viewDidScroll}>
        {this.refreshIndicator()}
        {cells}
        {this.loadMoreIndicator()}
      </div>
    )
  }
  refreshIndicator() {
    if(this.state.isRefreshing) {
      return (
        <div className="">...上拉刷新</div>
      )
    }
    return;
  }

  loadMoreIndicator() {
    if(this.state.isLoadingMore) {
      return(
        <div className="">...加载更多</div>
      )
    }
    return;
  }
}