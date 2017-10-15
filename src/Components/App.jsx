import React, {Component} from 'react';

export default class App extends Component {
    render () {
        return (
            <div style={{textAlign: 'center'}}>
                <h1>Hello my friends!</h1>
                <p>{this.props.greeting}</p>
            </div>
        );
    }
}