import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.css';

export default () => (
  <Editor
    wrapperClassName="demo-wrapper"
    editorClassName="demo-editor"
    localization={{
      locale: 'zh'
    }}
    toolbar={{
      image: {
        urlEnabled: true,
        uploadEnabled: true,
        alignmentEnabled: true,
        previewImage: true,
        // 当这个返回没有返回promise的时候上传图片会报错，一直显示加载图标 实际开发中这个是用来将图片上传到服务器再用服务器返回的url替换当前编辑器中的图片路径
        uploadCallback: ()=>{},
        inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
        alt: { present: false, mandatory: false },
        defaultSize: {
          height: '20px',
          width: '20px'
        }
      }
    }}
  />
);
