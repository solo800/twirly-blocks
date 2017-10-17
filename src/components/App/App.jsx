import React from 'react';
import Paragraph from '../Paragraph/Paragraph.jsx';
import styles from './app.scss';

export default class App extends React.Component {
    constructor (props) {
        const now = new Date();

        super(props);
        this.state = {
            time: `${now.getHours()}:${now.getMinutes()}`
        };
    }
    render () {
        return (
            <div className={styles.container}>
                <h1 className={styles.header}>Hello my friends!</h1>
                <Paragraph text='I am a pragraph element' />
            </div>
        );
    }
}