// 这个主要实现了排序拖拽 基于react-dnd 高级api useDrag useDrop 实现
import React from 'react';
import Example from './example';
import { DndProvider,DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
console.log(DndProvider,DragDropContextProvider);

function SortDrag() {
  return (
    <div className="App">
      <DragDropContextProvider backend={HTML5Backend}>
        <Example></Example>
      </DragDropContextProvider>
    </div>
  );
}
export default SortDrag;