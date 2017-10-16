import React from 'react';

export default class App extends React.Component {
    render () {
        return (
            <div style={{textAlign: 'center'}}>
                <h1>Hello my friends!</h1>
                <p>{this.props.greeting}</p>
            </div>
        );
    }
}