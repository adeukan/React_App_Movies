import React from 'react';
import $ from 'jquery';

class Info extends React.Component {

    // runs once after component is mounted
    // used to scale the movie block to fit the screen
	componentDidMount() {

		// current window height
		var windowHeight = $(window).height();
		// movie div height
		var movieHeight = $('.info-wrapper').height();
		// ratio between them
		var ratio = windowHeight / movieHeight;
		// scale the movie div using the ratio
		$('.info-wrapper').css({ zoom: ratio });

		// scale the movie div if window resized
		$(window).resize(function() {
			// check the updated window height
			windowHeight = $(window).height();
			var ratio = windowHeight / movieHeight;
			$('.info-wrapper').css({ zoom: ratio });
		});

		// previous values of screen and window width
		var prevScreenWidth = window.screen.width;
		var prevWindowWidth = $(window).height();
		
		// check the screen changes and scale the movie block
		setInterval(function () {
			// current values of screen and window width
			var currentScreenWidth = window.screen.width;
			var currentWindowWidth = $(window).height();

			// if window or screen width were changed rescale the movie info div
			if(currentScreenWidth !== prevScreenWidth || currentWindowWidth !== prevWindowWidth ) {
				// current window height
				var windowHeight = $(window).height();
				// movie div height
				var movieHeight = $('.info-wrapper').height();
				// ratio between them
				var ratio = windowHeight / movieHeight;
				// scale the movie div using the ratio
				$('.info-wrapper').css({ zoom: ratio });
				// update previous values
				if(currentScreenWidth !== prevScreenWidth)  prevScreenWidth = currentScreenWidth;
				else										prevWindowWidth = currentWindowWidth; 
			}
		}, 200);
	}

	render() {
		if (this.props.location.state.movie !== null) {
			// check the movie properties and create elements if needed
			if (this.props.location.state.poster_url.length > 30)
				var poster = (
					<li className="list-group-item">
						<img src={this.props.location.state.poster_url} className="info-poster" alt="posterPath" />
					</li>
				);
			if (this.props.location.state.movie.title !== '')
				var title = (
					<li className="list-group-item active info-title">{this.props.location.state.movie.title}</li>
				);
			if (this.props.location.state.movie.runtime !== '')
				var runtime = <li className="list-group-item">{this.props.location.state.movie.runtime} minutes</li>;
			if (this.props.location.state.movie.tagline !== '')
				var tagline = <li className="list-group-item">"{this.props.location.state.movie.tagline}"</li>;
			if (this.props.location.state.movie.release_date !== '')
				var year = (
					<li className="list-group-item">{this.props.location.state.movie.release_date.substring(0, 4)}</li>
				);
			if (this.props.location.state.movie.overview !== '')
				var overview = (
					<li className="list-group-item info-overview"> {this.props.location.state.movie.overview}</li>
				);
			if (this.props.location.state.movie.homepage !== null)
				var homepage = (
					<li className="list-group-item">
						<a href={this.props.location.state.movie.homepage}>Home Page</a>
					</li>
				);

			// get the set of genres and create the element if needed
			if (this.props.location.state.movie.genres.length > 0) {
				var genres = this.props.location.state.movie.genres;
				genres = genres.map((genre, index) => (
					<span key={genre.id}>
						<span>{genre.name}</span>
						{genres[index + 1] != null && <span>&nbsp;|&nbsp;</span>}
					</span>
				));
			}

			// get the set of countries and create the element if needed
			if (this.props.location.state.movie.production_countries.length > 0) {
				var countries = this.props.location.state.movie.production_countries;
				countries = countries.map((country, index) => (
					<span key={index}>
						<span>{country.name}</span>
						{countries[index + 1] != null && <span>&nbsp;|&nbsp;</span>}
					</span>
				));
			}
		}

		// return the prepared elements if they exist
		return (
			<div className="info-wrapper">
				<ul className="list-group panel-body list">
					{title != null && title}
					{genres != null && <li className="list-group-item"> {genres} </li>}
					{runtime != null && runtime}
					{poster != null && poster}
					{tagline != null && tagline}
					{homepage != null && homepage}
					{countries != null && <li className="list-group-item"> {countries} </li>}
					{year != null && year}
					{overview != null && overview}
				</ul>
			</div>
		);
	}
}

export default Info;
