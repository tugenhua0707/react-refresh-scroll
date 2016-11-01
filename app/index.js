
import React from 'react'
import ReactDOM from 'react-dom'
import fetch from 'isomorphic-fetch';

import './index.css';

import View1 from './views/view1';
import View2 from './views/view2';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    // 初始化数据
    this.initData();
    this.handleScrollToTop1 = this.handleScrollToTop1.bind(this);
    this.handleScrollToBottom1 = this.handleScrollToBottom1.bind(this);

    this.handleScrollToTop2 = this.handleScrollToTop2.bind(this);
    this.handleScrollToBottom2 = this.handleScrollToBottom2.bind(this);

    // 是否正在加载 防止滑动过快 发多次请求
    this.isLoading = false;
  }
  render() {
    return(
      <div>
      
        <View1 data = {this.state.data}  
            onScrollToBottom = {this.handleScrollToBottom1} />
        {
          /*
            <View2 data = {this.state.data} onScrollToTop = {this.handleScrollToTop2} 
            onScrollToBottom = {this.handleScrollToBottom2} />
          */
        }
      </div>
    )
  }
  initData() {
    var me = this;
    fetch('http://localhost:8080/msg-list.json').then(function(res){
      res.json().then(function(data){
        var data = data.data;
        me.setState({
          data: data
        })
      })
    }).catch((e) => {
      console.log(e);
    })
  }
  moreData(oldData) {
    var me = this;
    if(!this.isLoading) {
      fetch('http://localhost:8080/msg-list2.json',{}).then((res)=> {
        res.json().then((data) =>{
          var data = data.data;
          var newData = me.state.data.concat(data);
          me.setState({
            data: newData
          });
          me.isLoading = true;
        })
      }).catch((e) => {
        console.log(e);
      })
    }
  }
  // view1
  handleScrollToTop1(completed) {
    // 顶部刷新
    setTimeout(function(){
      completed();
      this.initData();
    }.bind(this),1000);
  }
  handleScrollToBottom1(completed) {
    // 加载更多
    setTimeout(function(){
      completed();
      this.isLoading = false;
      this.moreData(this.state.data);
    }.bind(this),1000)
  }
  // view2
  handleScrollToTop2(completed) {
    // 顶部刷新
    setTimeout(function(){
      completed();
      this.initData();
    }.bind(this),1000);
  }
  handleScrollToBottom2(completed) {
    // 加载更多
    setTimeout(function(){
      completed();
      this.isLoading = false;
      this.moreData(this.state.data);
    }.bind(this),1000)
  }
}

