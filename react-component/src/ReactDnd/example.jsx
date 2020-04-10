import React from 'react'
import BoxWithImage from './BoxWithImage'
import BoxWithHandle from './BoxWithHandle'
import AntdTableDrag from './AntdTableDrag';
const Container = () => (
  <div>
    <div style={{ marginTop: '1.5rem',overflowX: 'hidden',padding: '50px'}}>
      <BoxWithHandle />
      <BoxWithImage text='Drag me to see an image 1' />
      <AntdTableDrag></AntdTableDrag>
    </div>
  </div>
)
export default Container
