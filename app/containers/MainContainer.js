import React, { PropTypes } from 'react';
import Head from '../components/Head';
import BarsContainer from './BarsContainer';
import Footer from '../components/Footer';

class MainContainer extends React.Component {

  constructor() {
		super();
		this.state = {
			location: '',
      submitedLocation: ''
			};
    this.handleUpdateLocation = this.handleUpdateLocation.bind(this);
    this.handleSubmitLocation = this.handleSubmitLocation.bind(this);
	}

  handleUpdateLocation(e) {
    this.setState({
      location: e.target.value
    });
  }

  handleSubmitLocation() {
    this.setState({
      submitedLocation: this.state.location,
      location: ''
    });
  }

  render() {
    return (
      <div>
        <Head location={this.state.location}
          onUpdateLocation={this.handleUpdateLocation}
          onSubmitLocation={this.handleSubmitLocation} />
        <BarsContainer location={this.state.submitedLocation} />
        <Footer />
      </div>
    )
  }
}

export default MainContainer;
