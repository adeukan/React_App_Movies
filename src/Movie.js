import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';

class Movie extends React.Component {
    constructor(props) {
        super(props);
        // setup the state
        this.state = {
            poster_path: 'http://image.tmdb.org/t/p/w185'
        };
    }

    // runs when component is mounted
    componentDidMount() {
        this.setState(
            (prevState) => ({ poster_path: prevState.poster_path + this.props.poster_id }),
            () => {
                console.log(this.state.poster_path);
            }
        );
    }

    // to={{...}} is used for sending props through the link
    render() {
        return (
            <Link to={{ pathname: '/info',
                         state: { id: this.props.id }
                     }}>
                <img src={this.state.poster_path} className="poster col-sm-4 col-md-3 col-lg-2" alt="Poster"/>
            </Link>
        );
    }
}

export default Movie;