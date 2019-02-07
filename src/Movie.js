import React from 'react';
import { Link } from 'react-router-dom';

class Movie extends React.Component {
    constructor(props) {
        super(props);
        // setup the state
        this.state = {
            poster_path: 'http://image.tmdb.org/t/p/w185'
        };
    }

    // runs once after component is mounted
    componentDidMount() {
        // use the received props to change the poster URL in state
        this.setState(
            (prevState) => ({ poster_path: prevState.poster_path + this.props.poster_id }),
            () => {
                // console.log(this.state.poster_path);
            }
        );
    }

    // to={{...}} is used for sending 'id' and 'poserURL' to Info component
    render() {
        return (
            // the image is used as a React Link
            <Link to={{ pathname: '/info',
                        state: { id: this.props.id,  posterURL: this.state.poster_path }
                     }}>
                <img src={this.state.poster_path} className="home-poster col-sm-4 col-md-3 col-lg-2" alt="Poster"/>
            </Link>
        );
    }
}

export default Movie;