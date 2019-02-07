import React from 'react';
import axios from 'axios';

class Info extends React.Component {
    constructor(props) {
        super(props);
        // current movie object
        this.state = {
            movie: null
        };
    }

    // runs once after component is mounted
    componentDidMount() {
        // query the info about the selected movie
        let url =
            `https://api.themoviedb.org/3/movie/ ${this.props.location.state.id} ?api_key=a3abe9699d800e588cb2a57107b4179c`;
        axios
            .get(url)
            .then((response) => {
                this.setState({ movie: response.data });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        // console.log(this.state.movie);

        // skip this at the first rendering to adoid 'property of null' error
        if (this.state.movie !== null) {

            // check the movie properties and create elements if needed 
            if(this.props.location.state.posterURL.length > 30) 
                var poster = <li className="list-group-item"><img src={this.props.location.state.posterURL} className="info-poster" alt="posterPath"/></li>
            if(this.state.movie.title !== "")
                var title = <li className="list-group-item active info-title">{this.state.movie.title}</li>
            if(this.state.movie.runtime !== "")
                var runtime = <li className="list-group-item">{this.state.movie.runtime} minutes</li>
            if(this.state.movie.tagline !== "")
                var tagline = <li className="list-group-item">"{this.state.movie.tagline}"</li>
            if(this.state.movie.release_date !== "")
                var year = <li className="list-group-item">{this.state.movie.release_date.substring(0,4)}</li>
            if(this.state.movie.overview !== "")
                var overview = <li className="list-group-item info-overview"> {this.state.movie.overview}</li>
            if (this.state.movie.homepage !== null)
                var homepage = <li className="list-group-item"><a href={this.state.movie.homepage}>Home Page</a></li>

            // get the set of genres and create the element if needed
            if (this.state.movie.genres.length > 0) {
                var genres = this.state.movie.genres;
                genres = genres.map((genre, index) => (
                    <span key={genre.id}>
                        <span>{genre.name}</span>
                        {
                            genres[index + 1] != null
                            && <span>&nbsp;|&nbsp;</span>
                        }
                    </span>
                ));
            }

            // get the set of countries and create the element if needed
            if (this.state.movie.production_countries.length > 0) {

                var countries = this.state.movie.production_countries;
                countries = countries.map((country, index) => (
                    <span key={index}>
                        <span>{country.name}</span>
                        {
                            countries[index + 1] != null
                            && <span>&nbsp;|&nbsp;</span>
                        }
                    </span>
                ));
            } 
        }
        
        // return the prepared elements if they exist
        return (
                <ul className="list-group panel-body info-wrapper">
                    {title != null && title}
                    {genres != null &&  <li className="list-group-item"> {genres} </li>}
                    {runtime != null && runtime}
                    {poster != null && poster}
                    {tagline != null && tagline}
                    {homepage != null && homepage}
                    {countries != null && <li className="list-group-item"> {countries} </li>}
                    {year != null && year}
                    {overview != null && overview}
                </ul>
        )
    }
}

export default Info;