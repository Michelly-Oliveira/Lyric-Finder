import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case 'SEARCH_TRACKS':
			return {
				...state,
				track_list: action.payload,
				heading: 'Search Results',
			};
		default:
			return state;
	}
};

export class Provider extends Component {
	// Global state for the app
	state = {
		track_list: [],
		heading: 'Top 10 Tracks',
		dispatch: (action) => this.setState((state) => reducer(state, action)),
	};
	// Reducer allows every consumer to be able to call dispatch and change the state of the context

	componentDidMount() {
		// Start showing the top 10 tracks
		axios
			.get(
				`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&if_has_lyric=1&apikey=${process.env.REACT_APP_MM_KEY}`
			)
			.then((res) => {
				console.log(res.data);
				// Add the 10 tracks to the state
				this.setState({ track_list: res.data.message.body.track_list });
			})
			.catch((err) => console.log(err));
	}

	render() {
		return (
			// Make state accessible throughout the app
			<Context.Provider value={this.state}>
				{this.props.children}
			</Context.Provider>
		);
	}
}

// What is imported into a component so that it can access the state from the context
export const Consumer = Context.Consumer;
