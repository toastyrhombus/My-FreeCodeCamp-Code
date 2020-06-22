import React from 'react';
import { connect } from 'react-redux';

const select = state => {
    return { output: state.output };
}

class Display extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
        <div id="display" className="col-12 card justify-content-center"><p className="text-right display-text">{this.props.output}</p></div>
        )
    }
}

const ReduxDisplay = connect(select)(Display);

export default ReduxDisplay;