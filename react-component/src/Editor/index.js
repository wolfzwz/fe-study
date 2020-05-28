import React from "react";
import Tinymce from "./Tinymce";
import ReactDraftWysiwyg from "./DraftWysiwyg";
import BraftEditorAll from "./BraftEditor";
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        {/* <h2>ReactDraftWysiwyg</h2>
        <ReactDraftWysiwyg></ReactDraftWysiwyg>
        <h2>Tinymce</h2>
        <Tinymce></Tinymce> */}
        <h2>BraftEditor</h2>
        <BraftEditorAll></BraftEditorAll>
      </div>
    );
  }
}

export default Editor;
