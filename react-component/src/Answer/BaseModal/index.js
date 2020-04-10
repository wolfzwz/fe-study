import React, { Component } from 'react';
import styles from './styles.scss';
class BaseModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { display, close, children } = this.props;
    return (
      <div className={styles.modalWrapper} style={{ display: display ? 'block' : 'none' }}>
        <ul className={styles.modal}>
          <li className={styles.dialog}>
            <div className={styles.close} onClick={close} />
            {children}
          </li>
        </ul>
      </div>
    );
  }
}

export default BaseModal;
