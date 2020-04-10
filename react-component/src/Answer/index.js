import React, { Component } from 'react';
import PersonalDetail from './PersonalDetail';
import AnswerList from './AnswerList';
class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <h2>答题名单</h2>
        <PersonalDetail />
        <AnswerList></AnswerList>
      </>
    );
  }
}

export default Answer;
