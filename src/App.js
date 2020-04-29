import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from './context';

import Navbar from './components/layout/Navbar';
// Holds other components
import Index from './components/layout/Index';
import Lyrics from './components/tracks/Lyrics';

import './App.css';

function App() {
	return (
		<Provider>
			<Router>
				<React.Fragment>
					{/* Navbar will show in every page-route */}
					<Navbar />
					{/* Push the content to the middle */}
					<div className='container'>
						{/* Switch between the pages - routes */}
						<Switch>
							{/* Initial page/route show Index component */}
							<Route exact path='/' component={Index} />
							{/* Show the lyrics of a track */}
							<Route exact path='/lyrics/track/:id' component={Lyrics} />
						</Switch>
					</div>
				</React.Fragment>
			</Router>
		</Provider>
	);
}

export default App;
