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
