import React from 'react';
import { Table } from 'antd';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import 'antd/dist/antd.css';
import './AntdTableDrag.css';

let dragingIndex = -1;
let target = undefined;
const isIEOrEdge = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('msie') > -1;
  const isEdge = userAgent.indexOf('edge') > -1;
  const isIE11 = userAgent.indexOf('trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
  return isIE || isEdge || isIE11;
};
function getMousePos(event) {
  var e = event || window.event;
  var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
  var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
  var x = e.pageX || e.clientX + scrollX;
  var y = e.pageY || e.clientY + scrollY;
  //alert('x: ' + x + '\ny: ' + y);
  return { x: x, y: y };
}
function getOs() {
  var OsObject = '';
  if (navigator.userAgent.indexOf('MSIE') > 0) {
    return 'MSIE';
  }
  if (navigator.userAgent.indexOf('Firefox') > 0) {
    return 'Firefox';
  }
  if (navigator.userAgent.indexOf('Safari') > 0) {
    return 'Safari';
  }
  if (navigator.userAgent.indexOf('Camino') > 0) {
    return 'Camino';
  }
  if (navigator.userAgent.indexOf('Gecko/') > 0) {
    return 'Gecko';
  }
}
function getStyle(obj, styleName) {
	if (obj.currentStyle) {
		return obj.currentStyle[styleName];
	} else {
		return getComputedStyle(obj, false)[styleName];
	}
}
class BodyRow extends React.Component {
  render() {
    const {
      isOver,
      isDragging,
      connectDragSource,
      connectDropTarget,
      moveRow,
      ...restProps
    } = this.props;
    const style = { ...restProps.style, cursor: 'move' };

    let className = restProps.className;
    if (isOver) {
      if (restProps.index > dragingIndex) {
        className += ' drop-over-downward';
      }
      if (restProps.index < dragingIndex) {
        className += ' drop-over-upward';
      }
    }

    return connectDragSource(
      connectDropTarget(<tr {...restProps} className={className} style={style} />)
    );
  }
}

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    if (!isIEOrEdge()) {
      document.addEventListener(
        'drag',
        function(e) {
          if (!target) {
            // target = e.target.cloneNode(true);
            // target = document.createElement('div');
            // target.setAttribute('id', 'target');
            // target.style.position = 'fixed';
            // target.style.width = getStyle(e.target)
            // target.style.height = 52+'px'
            // target.style.background = '#000'
            // target.innerHTML = '沃尔夫均为积分积分'
            // target = e.target;
            // target.style.position = 'fixed';
            // target.setAttribute('id', 'target');
            // if (getMousePos(e).y <= 0) {
            //   target.style.display = 'none';
            // }
            //document.body.querySelectorAll('tbody')[0].appendChild(target);
          }
            // if (getMousePos(e).y <= 0) {
            //   target.style.display = 'none';
            // }
            
          target = e.target;
          target.style.position = 'fixed';
          target.setAttribute('id', 'target');
          if (getMousePos(e).y > 0) {
            let pos = e.target.getBoundingClientRect();
            target.style.left = pos.left + 'px';
            // target.style.top = e.pageY +20 + 'px';
          }
        },
        false
      );
    }
    return {
      index: props.index
    };
  },
  isDragging:(props, monitor, component) => {
    console.log('isDragging',monitor.getItem())
    target && (target.style.top = monitor.getClientOffset().y +20 + 'px');
  },
  endDrag: (props, monitor, component) => {
    target.style.position = 'relative';
    target.style.left = 0 + 'px';
    target.style.top = 0 + 'px';
    //target = undefined;
    //document.body.querySelectorAll('tbody')[0].removeChild(document.querySelector('#target'));
  }
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))(
  DragSource('row', rowSource, (connect, monitor) => {
    return {
      connectDragSource: connect.dragSource(),
      //connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging()
    };
  })(BodyRow)
);

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  }
];

class DragSortingTable extends React.Component {
  state = {
    data: [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park'
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park'
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park'
      }
    ]
  };

  components = {
    body: {
      row: DragableBodyRow
    }
  };

  moveRow = (dragIndex, hoverIndex) => {
    const { data } = this.state;
    const dragRow = data[dragIndex];

    this.setState(
      update(this.state, {
        data: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]]
        }
      })
    );
  };

  render() {
    return (
      <Table
        className={'target'}
        columns={columns}
        dataSource={this.state.data}
        components={this.components}
        onRow={(record, index) => ({
          index,
          moveRow: this.moveRow
        })}
      />
    );
  }
}

const Demo = DragSortingTable;

export default Demo;
