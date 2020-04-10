import React from 'react';
import Example from './example';
import SortDrag from './SortDrag'
import SortDrag1 from './SortDrag1';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

function ReactDnd() {
  return (
    <div className="App">
      <div
        className="drag"
        style={{ overflow: 'hidden', position: 'fixed', left: '-1000px', transform: 'scale(0.2)' }}
      />
      {/* 这个只是实现简单的拖拽 因为不能同时有两个HTML5Backend 所以添加了注释 */}
      {/* <DragDropContextProvider backend={HTML5Backend}>
        <Example />
      </DragDropContextProvider> */}
      <hr></hr>
      <h2>排序拖拽 react usestate 实现</h2>
      {/* <SortDrag></SortDrag> */}
      <h2>排序拖拽 react 低级api实现</h2>
      <SortDrag1></SortDrag1>
    </div>
  );
}

export default ReactDnd;
