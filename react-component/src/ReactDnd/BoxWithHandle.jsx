import React from 'react'
import { DragSource } from 'react-dnd'
import ItemTypes from './ItemTypes'
const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  width: '20rem',
}
const handleStyle = {
  backgroundColor: 'green',
  width: '1rem',
  height: '1rem',
  display: 'inline-block',
  marginRight: '0.75rem',
  cursor: 'move',
}
const BoxWithHandle = ({
  isDragging,
  connectDragSource,
  connectDragPreview,
}) => {
  const opacity = isDragging ? 0.4 : 1
  return connectDragPreview(
    <div style={Object.assign({}, style, { opacity })}>
      {connectDragSource(<div style={handleStyle} />)}
      Drag me by the handle
    </div>,
  )
}
export default DragSource(
  ItemTypes.BOX,
  {
    beginDrag: () => ({}),
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }),
)(BoxWithHandle)
