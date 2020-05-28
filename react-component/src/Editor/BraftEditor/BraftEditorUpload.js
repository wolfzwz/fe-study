/* 
    集成antd upload
*/
import "braft-editor/dist/index.css";
import React from "react";
import BraftEditor from "braft-editor";
import { ContentUtils } from "braft-utils";
import { ImageUtils } from "braft-finder";
import { Upload, Icon } from "antd";

export default class UploadDemo extends React.Component {
  state = {
    editorState: BraftEditor.createEditorState(null),
  };

  handleChange = (editorState) => {
    this.setState({ editorState });
  };

  uploadHandler = (param) => {
    if (!param.file) {
      return false;
    }
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
      console.log('res=',res,URL.createObjectURL(param.file));
      this.setState({
        editorState: ContentUtils.insertMedias(this.state.editorState, [
          {
            type: "IMAGE",
            url: res.url,
          },
        ]),
      });
    }).catch((err)=>{
      console.log('fetch-err',err)
    });
  };

  render() {
    const controls = [
      "bold",
      "italic",
      "underline",
      "text-color",
      "separator",
      "link",
      "separator",
    ];
    const extendControls = [
      {
        key: "antd-uploader",
        type: "component",
        component: (
          <Upload
            accept="image/*"
            showUploadList={false}
            customRequest={this.uploadHandler}
          >
            {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
            <button
              type="button"
              className="control-item button upload-button"
              data-title="插入图片"
            >
              <Icon type="picture" theme="filled" />
            </button>
          </Upload>
        ),
      },
    ];

    return (
      <div>
        <div className="editor-wrapper">
          <BraftEditor
            value={this.state.editorState}
            onChange={this.handleChange}
            controls={controls}
            extendControls={extendControls}
          />
        </div>
      </div>
    );
  }
}
