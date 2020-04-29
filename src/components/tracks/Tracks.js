import React, { Component } from 'react';
import { Consumer } from '../../context';
import Spinner from '../layout/Spinner';
import Track from './Track';

class Tracks extends Component {
	render() {
		return (
			// Use a Consumer component to be able to access the 'global' state from the context
			<Consumer>
				{/* value = what is passed from the Context.Provider value prop, which in this case is the entire state */}
				{(value) => {
					const { track_list, heading } = value;
					// Check if the track list is empty or undefined
					// Before it gets the response back from the api
					if (track_list === undefined || track_list.length === 0) {
						// Show spinner
						return <Spinner />;
					} else {
						return (
							<React.Fragment>
								<h3 className='text-center mb-4'>{heading}</h3>
								{/* Bootstrap for 2 columns of 6 rows each */}
								<div className='row'>
									{/* Loop through the track list and for each track create a Track component and pass the id and the other information of the track */}
									{track_list.map((item) => {
										return (
											<Track key={item.track.track_id} track={item.track} />
										);
									})}
								</div>
							</React.Fragment>
						);
					}
				}}
			</Consumer>
		);
	}
}

export default Tracks;
