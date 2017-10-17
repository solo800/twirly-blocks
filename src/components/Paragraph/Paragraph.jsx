import React from 'react';
import styles from './paragraph.css';

const Paragraph = (props) => {
    return (
        <p className={styles.container}>{props.text}</p>
    );
};

export default Paragraph;