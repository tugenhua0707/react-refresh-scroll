
import React from 'react';
import ReactDOM from 'react-dom';
import './index';

class ReactRefresh extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      isLoadingMore: false
    }
    this.viewDidScroll = this.viewDidScroll.bind(this);
  }
  render() {
    return (
      <div></div>
    )
  }
  findNodeIndex(dom) {
    var targetNodeIndex = 0;
    var nodes = document.getElementsByClassName(dom.className);
    for(let i = 0, len = nodes.length; i < len; i++) {
      var item = nodes[i];
      if(item == dom) {
        targetNodeIndex = i;
        break;
      }
    }
    return targetNodeIndex;
  }
  viewDidScroll(self) {
    var me = this;
    var dom = ReactDOM.findDOMNode(this);
    var tableViewIdName = dom.id;
    var tableViewClassName = dom.className;
    var targetNodeIndex = this.findNodeIndex(dom);
    var isFindNodeById = tableViewIdName ? true : false;
    var indicatorClassName = 'infinit-table-spinner';
    var scrollviewOffsetY = dom.scrollTop;
    var scrollviewFrameHeight = dom.clientHeight;
    var scrollviewContentHeight = dom.scrollHeight;
    var sum = scrollviewOffsetY + scrollviewFrameHeight;
    if(sum <= scrollviewFrameHeight) {
      // 说明页面没有滚动
      if(!this.props.onScrollToTop) {
        return;
      }
      if(this.state.isRefreshing) {
        return;
      }
      this.setState({
        isRefreshing: true
      })
      // 使用默认的刷新
      if(this.props.useDefaultIndicator) {
        var refreshIndicator = document.createElement("div");
        refreshIndicator.className = indicatorClassName;
        var tableView1 = isFindNodeById ? document.getElementById(tableViewIdName) : 
          document.getElementsByClassName(tableViewClassName)[targetNodeIndex];
        tableView1.insertBefore(refreshIndicator,tableView1.firstChild);
      }
      // 事件处理
      this.props.onScrollToTop(()=>{
        me.setState({
          isRefreshing: false
        })
        if(me.props.useDefaultIndicator) {
          var tableView1 = isFindNodeById ? document.getElementById(tableViewIdName) : 
            document.getElementsByClassName(tableViewClassName)[targetNodeIndex];
          var firstChild = tableView1.firstChild;
          if(firstChild.className.indexOf(indicatorClassName) > -1) {
            tableView1.removeChild(firstChild);
          }
        }
      });
    }else if(sum >= scrollviewContentHeight){
      if(!this.props.onScrollToBottom) {
        return;
      }
      if(this.state.isLoadingMore) {
        return;
      }
      this.setState({
        isLoadingMore: true
      });
      // 如果使用默认样式加载更多的话
      if(this.props.useDefaultIndicator) {
        var loadMoreIndicator = document.createElement("div");
        loadMoreIndicator.className = indicatorClassName;

        var tableView1 = isFindNodeById ? document.getElementById(tableViewIdName) : 
          document.getElementsByClassName(tableViewClassName)[targetNodeIndex];
        tableView1.insertBefore(loadMoreIndicator,tableView1.lastChild.nextSibling)
      }
      // 事件处理
      this.props.onScrollToBottom(()=>{
        me.setState({
          isLoadingMore: false
        });
        if(me.props.useDefaultIndicator) {
          var tableView1 = isFindNodeById ? document.getElementById(tableViewIdName) : 
            document.getElementsByClassName(tableViewClassName)[targetNodeIndex];
          var lastChild = tableView1.lastChild;
          if(lastChild.className.indexOf(indicatorClassName) > -1) {
            tableView1.removeChild(lastChild);
          }
        }
      });
    }
  }
}

ReactRefresh.defaultProps = {
  useDefaultIndicator: true
}

export default ReactRefresh;
