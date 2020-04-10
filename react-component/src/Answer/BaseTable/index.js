import React from 'react';
import { Table } from 'antd';
import styles from './styles.scss';

function BaseTable({ ...props }) {
  return (
    <div className={styles.table}>
      <Table {...props} />
    </div>
  );
}

export default BaseTable;
