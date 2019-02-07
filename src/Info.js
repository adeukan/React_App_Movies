import React from 'react'

class Info extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p> Props from the Link: {this.props.location.state.id} </p>
                <p> {this.props.test} </p>
            </div>
        );
    }
}

export default Info;