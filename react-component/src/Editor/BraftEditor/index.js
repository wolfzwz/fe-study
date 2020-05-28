import React,{Component} from 'react';
import BraftEditor from './BraftEditor';
import BraftEditorUpload from './BraftEditorUpload';
class BraftEditorAll extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <>
                <h2>基本功能</h2>
               {/* <BraftEditor></BraftEditor>  */}
               <h2>集成antd upload</h2>
               <BraftEditorUpload></BraftEditorUpload>
            </>
         );
    }
}
 
export default BraftEditorAll;