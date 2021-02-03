// input password 实现扫码枪扫码获取信息
import * as React from 'react';

export default class App extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      value: ''
    }
  }
  password = undefined;
  // 键盘事件
  keyup = (e) => {
    this.setState({
      value: e.target.value
    })
  }
  // 开始扫描
  clickStart = () => {
    console.log('clickStartPassword', this.password);
    this.password.focus();
  }
  // 重新扫描
  refresh = () => {
    this.password.focus();
    this.setState({
      value: ''
    })
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        {/* 容器元素，用来包裹input和div */}
        <div style={{ position: 'relative', height: '30px' }}>
          {/* password 用来获取焦点 监听keyup事件 */}
          <input
            ref={(ref) => this.password = ref}
            type="password"
            autoComplete="off"
            style={{ height: "28px", width: "100%", opacity: 0 }}
            onKeyUp={this.keyup}
            onChange={this.keyup}
            value={value}
          />
          {/* 用来显示扫码信息 */}
          <div style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, color: '#000', background: '#fff' }}>
            {value}
          </div>
        </div>
        <div onClick={this.clickStart}>开始扫描</div>
        <div onClick={this.refresh}>重新扫描</div>
      </div>
    );
  }
}
