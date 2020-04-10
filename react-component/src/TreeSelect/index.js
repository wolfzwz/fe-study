import React from 'react';
import { Form, TreeSelect } from 'antd';

const { TreeNode } = TreeSelect;
const CustomizedForm = Form.create({
  name: 'case_item',
  onFieldsChange(props, changedFields) {
    console.log(props,changedFields,'onFieldsChange');
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
        case_item: Form.createFormField({
        ...props.case_item,
        value: props.case_item.value,
      })
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  }
})(props => {
  const { getFieldDecorator } = props.form;
  return (
    <Form layout="inline">
      <Form.Item label="case_item">
        {getFieldDecorator('case_item', {
          rules: [{ required: true, message: 'case_item is required!' }]
        })(
          <TreeSelect
            showSearch
            style={{ width: '100%' }}
            //value={this.state.value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            onChange={(value,label,extra)=>{console.log(value,label,extra,'onchange')}}
          >
            <TreeNode value="parent 1value" title="parent 1" key="0-1">
              <TreeNode value="parent 1-0value" title="parent 1-0" key="0-1-1">
                <TreeNode value="leaf1value" title="my leaf" key="random" />
                <TreeNode value="leaf2value" title="your leaf" key="random1" />
              </TreeNode>
              <TreeNode value="parent 1-1value" title="parent 1-1" key="random2">
                <TreeNode value="sssvalue" title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
              </TreeNode>
            </TreeNode>
          </TreeSelect>
        )}
      </Form.Item>
    </Form>
  );
});
class Demo extends React.Component {
  state = {
    fields: {
        case_item: {
        value: 'parent 1value',
      }
    }
  };

  handleFormChange = changedFields => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields }
    }));
  };

  render() {
    const { fields } = this.state;
    return (
      <div>
        <CustomizedForm {...fields} onChange={this.handleFormChange} />
        <pre className="language-bash">{JSON.stringify(fields, null, 2)}</pre>
      </div>
    );
  }
}

export default Demo;
