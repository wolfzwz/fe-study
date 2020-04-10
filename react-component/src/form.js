import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";

class Dem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      update: false
    };
  }
  show = () => {
    const { isShow } = this.state;
    this.setState({
      isShow: !isShow,
      update: isShow ? false : true
    });
    
  };
  componentDidUpdate(props){
    console.log('update', props)
    console.log(this.state.update,'this.state.update')
    if (this.state.update) {
    	this.setState({
	      update: false
	    });
		this.props.form.setFieldsValue({ username: this.props.username.value });
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    console.log(this.props.username);
    return (
      <div>
        <Button type="default" onClick={this.show}>
          按钮
        </Button>
        {this.state.isShow ? (
          <Form layout="inline">
            <Form.Item label="Username">
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    message: "Username is required!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
          </Form>
        ) : null}
      </div>
    );
  }
}
const CustomizedForm = Form.create({
  name: "global_state",
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
  	console.log('maweina',props)
    return {
      username: Form.createFormField({
        ...props.username,
        value: props.username.value
      })
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  }
})(Dem);


class Demo extends React.Component {
  state = {
    fields: {
      username: {
        value: "benjycui"
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
