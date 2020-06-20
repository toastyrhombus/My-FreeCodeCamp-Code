import React from 'react';

class Display extends React.Component {
    render() {
        return (
            <div id="Display" className="display align-self-center p-1 w-100 text-center">{this.props.currentSound === '' ? "Display": this.props.currentSound}</div>
        )
    }
}

export default Display;