import React from 'react';
import styles from './paragraph.scss';

const Paragraph = (props) => {
    return (
        <p className={styles.container}>{props.text}</p>
    );
};

export default Paragraph;