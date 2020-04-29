import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import Spinner from '../layout/Spinner';

class Lyrics extends Component {
	// Make two request to the API
	// One for the track information
	// The other for the actual lyrics

	// The data from the state is only needed for this component, that is why we are not using the context provider to hold this information
	// Local state, component level state

	state = {
		track: {},
		lyrics: {},
	};

	componentDidMount() {
		// this.props.match.params.id = grab the track id from the url
		// Track id was passed as a parameter in the Track component, on the Link element: to={`lyrics/track/${track.track_id}`}
		axios
			.get(
				`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
			)
			.then((res) => {
				// Add lyrics to the state
				this.setState({ lyrics: res.data.message.body.lyrics });

				// Return another axios request to get the track info
				return axios.get(
					`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
				);
			})
			.then((res) => {
				// Get the result from the returned axios request

				// Add track info to the state
				this.setState({ track: res.data.message.body.track });
			})
			.catch((err) => console.log(err));
	}

	render() {
		const { track, lyrics } = this.state;
		console.log(track);
		// Check for undefined or empty track/lyrics
		if (
			track === undefined ||
			lyrics === undefined ||
			Object.keys(track).length === 0 ||
			Object.keys(lyrics).length === 0
		) {
			// Show the spinner
			return <Spinner />;
		} else {
			return (
				<React.Fragment>
					<Link to='/' className='btn btn-dark btn-sm mb-4'>
						Go Back
					</Link>
					<div className='card'>
						<h5 className='card-header'>
							{track.track_name} by{' '}
							<span className='text-secondary'>{track.artist_name}</span>
						</h5>
						<div className='card-body'>
							<p className='card-text'>{lyrics.lyrics_body}</p>
						</div>
					</div>

					<ul className='list-group mt-3'>
						<li className='list-group-item'>
							<strong>Album ID</strong>: {track.album_id}
						</li>
						<li className='list-group-item'>
							<strong>Song Genre</strong>:{' '}
							{track.primary_genres.music_genre_list.length !== 0
								? track.primary_genres.music_genre_list[0].music_genre
										.music_genre_name
								: 'N/A'}
						</li>
						<li className='list-group-item'>
							<strong>Explicit Words</strong>:{' '}
							{track.explicit === 0 ? 'No' : 'Yes'}
						</li>
						<li className='list-group-item'>
							<strong>Release Date</strong>:{' '}
							<Moment format='DD/MM/YYYY'>{track.updated_time}</Moment>
						</li>
					</ul>
				</React.Fragment>
			);
		}
	}
}

export default Lyrics;
