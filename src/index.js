import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Movie from "./Movie";
import Info from "./Info";

class MovieList extends React.Component {
    constructor(props) {
        super(props);
        // this is where we store movies when they have been retrieved
        this.state = { movies: [] };
    }

    // runs when component is mounted
    componentDidMount() {
        // url query for all popular movies
        var url =
            'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a3abe9699d800e588cb2a57107b4179c';
        // get all popular movies from TMDb
        axios
            .get(url)
            .then((response) => {
                // store the movies in state
                this.setState({ movies: response.data.results });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        const MovieList = this.state.movies.slice(0, 12).map(movie =>
            (<Movie key={movie.id} id={movie.id} poster_id={movie.poster_path}/>));

        return (<div className = "panel-body wrapper"> { MovieList } </div>)
    }
} // end of MovieList component


class App extends React.Component {

    // render={...} is used instead of component={...} to test the sending of props from the route
    // without creating new component each time
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={MovieList}/>
                    <Route path="/info" render={ (props) => <Info {...props} test="Props from the Route"/> }/>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));