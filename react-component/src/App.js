import React from 'react';
import logo from './logo.svg';
import './App.css';
// import ReactDnd from './ReactDnd';
// import Demo from './form';
import EditorI18n from './Editor';

// 考勤table
// import KaoqinTable from './KaoqinTable';

// import TreeSelect from './TreeSelect';

import GuangGaoTiao from './GuangGaoTiao';
import ImportExcel from './components/import-excel';

// const clentWidth = document.documentElement.clientWidth;
// const newFontSize = (100 / 750) * clentWidth;
// // console.log(newFontSize)
// document.documentElement.style.fontSize = newFontSize + 'px';
// /* 测试 上线前可以删除或者不删除 */
// window.onresize = function() {
//   const clentWidth = document.documentElement.clientWidth;
//   const newFontSize = (100 / 750) * clentWidth;
//   // console.log(newFontSize)
//   document.documentElement.style.fontSize = newFontSize + 'px';
// };
function App() {
  return (
    <div className="App">
      {/* <GuangGaoTiao/> */}
      {/* <EditorI18n></EditorI18n> */}
      {/* <Demo /> */}
      {/* <ReactDnd /> */}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {/* <Tinymce></Tinymce> */}
      {/* <KaoqinTable></KaoqinTable> */}
      {/* <TreeSelect></TreeSelect> */}
      <ImportExcel></ImportExcel>
    </div>
  );
}

export default App;
