import React from 'react';
import Paragraph from '../Paragraph/Paragraph.jsx';
import styles from './app.css';

export default class App extends React.Component {
    render () {
        return (
            <div className={styles.container}>
                <h1 className={subStyles.subElem}>Hello my friends!</h1>
                <Paragraph text='I am a pragraph element' />
            </div>
        );
    }
}