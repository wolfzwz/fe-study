import React, { Component } from 'react';
import Tabs from 'antd-mobile/lib/tabs'; // 加载 JS
import 'antd-mobile/lib/tabs/style/css';
import BaseTable from '../BaseTable';
import BaseModal from '../BaseModal';
import styles from './styles.scss';


const locale = {
  emptyText: '暂无学生'
};

const questions = [
  {
    classId: 333,
    curriculaID: 333,
    tutorialId: 456,
    taskID: 'ug22',
    score: 1,
    index: 1,
    correctAnswer: ['A', 'C'],
    type: 1,
    correctStudents: 33,
    errorStudents: 33,
    noneStudent: 33,
    partiallyCorrectStudents: 33,
    list: [
      {
        studentId: 111,
        name: '姓名',
        num: '学号',
        isRight: 1,
        isDone: true,
        studentAnswer: ['A', 'B']
      }
    ]
  },
  {
    classId: 333,
    curriculaID: 333,
    tutorialId: 456,
    taskID: 'ug22',
    score: 1,
    index: 2,
    correctAnswer: ['A', 'C'],
    type: 1,
    correctStudents: 32,
    errorStudents: 33,
    noneStudent: 33,
    partiallyCorrectStudents: 33,
    list: [
      {
        studentId: 111,
        name: '姓名',
        num: '学号',
        isRight: 1,
        isDone: true,
        studentAnswer: ['A', 'B']
      }
    ]
  }
];

class AnswerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      details: <div>2</div>,
      questionIndex: 0
    };
    this.dataSource = [
      {
        key: '1',
        stuid: 2001,
        name: 32,
        answer: 100
      },
      {
        key: '2',
        stuid: 200,
        name: 42,
        answer: 90
      }
    ];
    this.columns = [
      {
        title: '学号',
        dataIndex: 'stuid',
        key: 'stuid',
        defaultSortOrder: 'ascend',
        sorter: (a, b) => {
          return a.stuid - b.stuid;
        }
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => {
          return a.name - b.name;
        }
      },
      {
        title: '学生答案',
        dataIndex: 'answer',
        key: 'answer',
        sorter: (a, b) => {
          return a.answer - b.answer;
        },
        render: text => {
          console.log(text);
          return this.getDomByQuestionType({ type: 1 });
        }
      }
    ];
  }
  defaultRowKey = (recoder, index) => {
    return recoder.id || index;
  };
  getDomByQuestionType = (obj = { type: undefined }) => {
    // obj type
    const { type } = obj;
    let dom = undefined;
    let text = '';
    let style = '';
    if ([4, 5, 7].includes(type) === true) {
      style = 'seeDetails';
      text = '查看详情';
    } else if ([1, 2].includes(type)) {
      style = 0 ? 'strRight' : 'strError';
      text = '我放假哦i反饥饿而范加尔哦i附件';
    } else if (type === 6) {
      style = 'upload';
      text = 'fjsdfj.jpg';
    }
    dom = (
      <i className={styles[style]} onClick={this.clickAnswer}>
        {text}
      </i>
    );
    return dom;
  };
  getAnswerStatusTabsData() {
    const { errorStudents, correctStudents, partiallyCorrectStudents } = questions[
      this.state.questionIndex
    ];
    const tabs = [
      { title: `答错:${errorStudents}人`, sub: '1' },
      { title: `答对:${correctStudents}人`, sub: '2' },
      { title: `部分答对:${partiallyCorrectStudents}人`, sub: '3' },
      { title: `答题:${errorStudents + correctStudents + partiallyCorrectStudents}人`, sub: '4' }
    ];
    return tabs;
  }
  clickAnswer = () => {
    this.setState({
      modal: true
    });
  };
  clickCloseModal = () => {
    this.setState({
      modal: false
    });
  };
  clickAddQuestionIndex = () => {
    const { questionIndex } = this.state;
    this.setState({ questionIndex: questionIndex + 1 });
  };
  render() {
    const { dataSource, columns } = this;
    const { details } = this.state;
    return (
      <>
        {/* tit */}
        <h2 className={styles.tit}>
          <ul>
            <li className={[styles.arrow, styles.leftArrow].join(' ')} />
            <li>2</li>
            <li className={styles.arrow} onClick={this.clickAddQuestionIndex} />
          </ul>
        </h2>
        {/* list */}
        <div className={styles.listWrapper}>
          <Tabs
            tabs={this.getAnswerStatusTabsData()}
            initialPage={0}
            tabBarPosition="top"
            renderTab={tab => <span>{tab.title}</span>}
          >
            <div className={styles.table}>
              <BaseTable
                locale={locale}
                rowKey={this.defaultRowKey}
                dataSource={dataSource}
                columns={columns}
                pagination={false}
              />
            </div>
            <div className={styles.table}>
              <BaseTable
                locale={locale}
                rowKey={this.defaultRowKey}
                dataSource={dataSource}
                columns={columns}
                pagination={false}
              />
            </div>
            <div className={styles.table}>
              <BaseTable
                locale={locale}
                rowKey={this.defaultRowKey}
                dataSource={dataSource}
                columns={columns}
                pagination={false}
              />
            </div>
            <div className={styles.table}>
              <BaseTable
                locale={locale}
                rowKey={this.defaultRowKey}
                dataSource={dataSource}
                columns={columns}
                pagination={false}
              />
            </div>
          </Tabs>
        </div>
        <BaseModal display={this.state.modal} close={this.clickCloseModal}>
          {details}
        </BaseModal>
      </>
    );
  }
}

export default AnswerList;
