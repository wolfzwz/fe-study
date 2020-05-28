import "braft-editor/dist/index.css";
import React from "react";
import BraftEditor from "braft-editor";

export default class BasicDemo extends React.Component {
  state = {
    editorState: BraftEditor.createEditorState("<p>Hello <b>World!</b></p>"), // 设置编辑器初始内容
    outputHTML: "<p></p>",
  };

  componentDidMount() {
    this.isLivinig = true;
    // 3秒后更改编辑器内容
    setTimeout(this.setEditorContentAsync, 3000);
  }

  componentWillUnmount() {
    this.isLivinig = false;
  }

  handleChange = (editorState) => {
    this.setState({
      editorState: editorState,
      outputHTML: editorState.toHTML(),
    });
  };

  setEditorContentAsync = () => {
    this.isLivinig &&
      this.setState({
        editorState: BraftEditor.createEditorState("<p>你好，<b>世界!</b><p>"),
      });
  };
  uploadFn = (param) => {
    const fd = new FormData();
    fd.append('file', param.file);
    console.log("param", param,fd);
    // http://127.0.0.1:3000/file_upload 
    fetch(`https://www.mocky.io/v2/5cc8019d300000980a055e76`,{
      method: 'post',
      mode:'cors',
      headers:{
        //'Content-Type': 'multipart/form-data',
      },
      body: fd
    }).then((res)=>res.json()).then((res)=>{
      console.log('res=',res);
      param.success({
        ...res
      });
    }).catch((err)=>{
      console.log('fetch-err',err)
    });
    // param.error({
    //   msg: "unable to upload.",
    // });
  };
  render() {
    const { editorState, outputHTML } = this.state;

    return (
      <div>
        <div className="editor-wrapper">
          <BraftEditor
            value={editorState}
            onChange={this.handleChange}
            media={{ uploadFn: this.uploadFn,accepts:{
              image: 'image/png,image/jpeg,image/gif,image/webp,image/apng,image/svg',
              video: 'video/mp4',
              audio: 'audio/mp3'
            } }}
          />
        </div>
        <h5>输出内容</h5>
        <div className="output-content">{outputHTML}</div>
      </div>
    );
  }
}
