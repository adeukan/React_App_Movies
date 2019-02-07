import React from 'react';

class Movie extends React.Component {
	constructor(props) {
		super(props);
		// setup the state
		this.state = {
			key: '',
			poster_path: 'http://image.tmdb.org/t/p/w185'
		};

		// bind callback methods with `this`
		this.handleClick = this.handleClick.bind(this);
	}

	// click poster handler
	handleClick() {
		this.setState((prevState) => ({})); //// !!!!!!!!!!!!!!!!!!!
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

	render() {
		return (
			<td>
				<img onClick={this.handleClick} src={this.state.poster_path} alt="Movie Poster" />
			</td>
		);
	}
}

export default Movie;
