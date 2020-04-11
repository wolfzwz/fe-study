import React from "react";
import { Editor } from "@tinymce/tinymce-react";

class Tinymce extends React.Component {
  handleEditorChange = (e) => {
    console.log("Content was updated:", e.target.getContent());
  };

  render() {
    return (
      <Editor
        initialValue="<p>This is the initial content of the editor</p>"
        init={{
          height: 500,
          language: "zh_CN",
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
        }}
        onChange={this.handleEditorChange}
      />
    );
  }
}

export default Tinymce;
