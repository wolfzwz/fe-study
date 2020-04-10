import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { DragSource, DragPreviewImage } from 'react-dnd';
import ItemTypes from './ItemTypes';
import boxImage from './boxImage';
const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
  width: '1000px'
};
// 画出预览图
function createDragPreview(text, style, img) {
  //新建img对象
  if (!img) img = new Image();

  let rectHeight = style.paddingTop + style.fontSize + style.paddingBottom;
  let rectStrokeWidth = 1;
  //创建canvas
  let c = document.createElement('canvas');
  c.height = rectHeight;
  let ctx = c.getContext('2d');
  ctx.font = style.fontSize + 'px sans-serif';
  let textWidth = Math.min(ctx.measureText(text).width, 100);
  let rectWidth = style.paddingLeft + textWidth + style.paddingRight;
  ctx.canvas.width = style.paddingLeft + textWidth + style.paddingRight + rectStrokeWidth * 2;
  ctx.font = style.fontSize + 'px sans-serif';
  ctx.rect(0, 0, rectWidth, rectHeight);
  ctx.save();
  ctx.fillStyle = style.backgroundColor;
  ctx.strokeStyle = style.borderColor;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  ctx.fillStyle = style.color;
  ctx.scale(0.5, 0.5);
  //关键是这里，将表格的行数据传给canvas
  ctx.fillText(text, style.paddingLeft, rectHeight);
  ctx.textAlign = 'center';
  //将canvas转为base64形式的图片地址，并赋值给img
  img.src = c.toDataURL('image/svg', 1);
  //console.log(c, c.toDataURL(), rectHeight);
  return img;
}
const style1 = {
  paddingTop: 7,
  fontSize: 16,
  paddingBottom: 7,
  paddingLeft: 28,
  textWidth: 100,
  paddingRight: 7,
  backgroundColor: '#f7fdfe',
  borderColor: '#c9eaff',
  color: '#000'
};
class BoxWithImage extends Component {
  componentDidMount() {
    const { isDragging, connectDragSource, connectDragPreview } = this.props;
    const opacity = isDragging ? 0.5 : 1;
    // 画出预览图方法
    // connectDragPreview(createDragPreview('Drag Drag Drag Drag Drag DragDrag Drag Drag Drag Drag DragDrag Drag Drag Drag Drag DragDrag Drag Drag Drag Drag DragDrag Drag Drag Drag Drag Drag', style1),{captureDraggingState:true,anchorX: 0,offsetX: 0});
    // 创建预览div
    const div = document.createElement('DIV');
    div.appendChild(this.drag.cloneNode(true));
    document.querySelectorAll('.drag')[0].appendChild(div);
    // 火狐则预览图显示当前元素，不是火狐则显示空div,显示自定义预览图
    const drag = getOs() === 'Firefox' ? this.drag : document.createElement('DIV')
    connectDragPreview(drag);
    // connectDragPreview(document.querySelectorAll('.drag')[0],{offsetX: 0,offsetY: 0});
  }
  render() {
    const { isDragging, connectDragSource, connectDragPreview } = this.props;
    const opacity = isDragging ? 0.5 : 1;
    return connectDragSource(
      <div
        ref={drag => {
          this.drag = drag;
        }}
      >
        {/* <DragPreviewImage connect={connectDragPreview} src={createDragPreview('Drag', style1)} /> */}
        {/* <img src={boxImage} /> */}
        <div className="z" ref={connectDragSource} style={Object.assign({}, style, { opacity })}>
          Drag me to see an image
        </div>
      </div>
    );
  }
}
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
  return { 'x': x, 'y': y }; 
} 
function getOs()  
{  
    var OsObject = "";  
   if(navigator.userAgent.indexOf("MSIE")>0) {  
        return "MSIE";  
   }  
   if(navigator.userAgent.indexOf("Firefox")>0){  
        return "Firefox";  
   }  
   if(navigator.userAgent.indexOf("Safari")>0) {  
        return "Safari";  
   }   
   if(navigator.userAgent.indexOf("Camino")>0){  
        return "Camino";  
   }  
   if(navigator.userAgent.indexOf("Gecko/")>0){  
        return "Gecko";  
   }  
     
}
function getStyle(obj, styleName) {
	if (obj.currentStyle) {
		return obj.currentStyle[styleName];
	} else {
		return getComputedStyle(obj, false)[styleName];
	}
}  
export default DragSource(
  ItemTypes.BOX,
  {
    beginDrag: (props, monitor, component) => {
      // let img = new Image();
      // img.src= createDragPreview('Drag me to see an image', style1);
      // img.setAttribute('id','target')
      // document.body.appendChild(img);
      // let target = document.querySelector('#target')
      if (!isIEOrEdge()) {
        document.addEventListener(
          'drag',
          function(e) {
            if (!target) {
                target = e.target.cloneNode(true);
                target.setAttribute('id', 'target');
                target.style.position = 'fixed';
                target.querySelectorAll('.z')[0].style.opacity = 1;
                if(getMousePos(e).y <= 0){target.style.display = 'none'}
                document.body.appendChild(target);

            }
            if(getMousePos(e).y > 0){
              
              let pos = e.target.getBoundingClientRect();
              target.style.left = pos.left + 'px';
              target.style.top = e.pageY + 'px';
            }
          },
          false
        );
      }
      const item = { id: props.id };
      return item;
    },
    isDragging(props, monitor) {
      // If your component gets unmounted while dragged
      // (like a card in Kanban board dragged between lists)
      // you can implement something like this to keep its
      // appearance dragged:
      return monitor.getItem().id === props.id;
    },
    endDrag: (props, monitor, component) => {
      target = undefined;
       document.body.removeChild(document.querySelector('#target'));
    }
  },
  (connect, monitor) => {
    return {
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging()
    };
  }
)(BoxWithImage);
