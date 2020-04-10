import React from 'react';
import { Table } from 'antd';
import moment from 'moment';

const data = [];
for (let i = 0; i < 31; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    bianhao: 32,
    job: `${Math.random() < 0.5 ? '上班' : '请假'}`
  });
}

class KaoqinTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: '姓名',
          width: 100,
          dataIndex: 'name',
          key: 'name',
           fixed: 'left'
        },
        {
          title: '编号',
          width: 100,
          dataIndex: 'bianhao',
          key: 'age',
           fixed: 'left'
        }
      ]
    };
  }
  getColumns = () => {
    let weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    let dayTotal = moment().daysInMonth();
    let arr = [];
    for (let i = 1; i <= dayTotal; i++) {
      // 星期
      let week = weekdays[moment(`2019-11-${i}`).day()];
      let obj = {
        title: (
          <div>
            {week}
            <div>{i}</div>
          </div>
        ),
        dataIndex: 'job',
        key: i,
      };
      arr.push(obj);
    }
    const { columns } = this.state;
    this.setState({
      columns: [...columns, ...arr]
    });
    console.log(this.state.columns);
  };
  componentDidMount() {
    this.getColumns();
  }
  render() {
    return (
      <Table
        columns={this.state.columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: 2000, y: 500 }}
      />
    );
  }
}

export default KaoqinTable;
