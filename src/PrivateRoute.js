import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Nav from './Nav';
import CTC from './CTC/CTC';
import Login from './login';
import TopBar from './TopBar';
import TrainController from './TrainController';
import TrainModel from './TrainModel/TrainModel';
import TrackModel from './TrackModel/TrackModel';
import { SpeedProvider } from './SpeedProvider';

import 'firebase/auth';
import { FirebaseAuthConsumer } from '@react-firebase/auth';
import TrackController from './TrackController/TrackController';

const PrivateRoute = () => {
	return (
			<FirebaseAuthConsumer>
				{({ isSignedIn, user, providerId }) => {
					if (isSignedIn) {
						return(
							<SpeedProvider>
								<Router>
									<div className="App">
										<TopBar />
										<Nav />
										<Switch>
											<Redirect exact from="/" to="/CTC"/>
											<Route path="/CTC" exact component={CTC}/>
											<Route path="/TrackModel" exact component={TrackModel}/>
											<Route path="/TrainModel" exact component={TrainModel}/>
											<Route path="/TrainController" exact component={TrainController}/>
										</Switch>
									</div>
								</Router>
							</SpeedProvider>
						);
					} else {
						return (<Login />);
					}
				}}
			</FirebaseAuthConsumer>
	);
}

export default PrivateRoute;
