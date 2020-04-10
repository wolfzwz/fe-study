import React, { Component } from 'react';
import BaseTable from '../BaseTable';
import styles from './styles.scss';


class PersonalDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  defaultRowKey = (recoder, index) => {
    return recoder.id || index;
  };
  render() {
    return (
      <>
        {/* tit */}
        <h2 className={styles.tit}>
          <i>*</i> Pre-reading activities-1
        </h2>
        <div className={styles.table}>
          {/* <BaseTable
            locale={locale}
            rowKey={this.defaultRowKey}
            dataSource={dataSource}
            columns={columns}
            pagination={false}
          /> */}
        </div>
      </>
    );
  }
}

export default PersonalDetail;
