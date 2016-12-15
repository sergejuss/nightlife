import React, { PropTypes } from 'react';
import Input from '../components/Input.jsx';
import BarsContainer from './BarsContainer';
import { user_auth_ajax } from '../config/ajax';

class MainContainer extends React.Component {

  constructor() {
		super();
		this.state = {
			location: '',
      submitedLocation: '',
      user_auth: false,
      userBars: []
			};
    this.handleUpdateLocation = this.handleUpdateLocation.bind(this);
    this.handleSubmitLocation = this.handleSubmitLocation.bind(this);
	}

  componentDidMount() {
    var last_location = localStorage.getItem('last_location') ?
      localStorage.getItem('last_location') : "";
    user_auth_ajax(last_location)
      .then(function(data) {
        // console.log(data.data);
        this.setState({
          user_auth: data.data.user_authenticated,
          submitedLocation: data.data.last_location,
          userBars: data.data.user_bars
        })
      }.bind(this))
      .catch(function(err) {
        console.log('Error in MainContainer: ', err);
      })
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
        <Input location={this.state.location}
          submitedLocation={this.state.submitedLocation}
          onUpdateLocation={this.handleUpdateLocation}
          onSubmitLocation={this.handleSubmitLocation}
          userAuth={this.state.user_auth} />
        <BarsContainer location={this.state.submitedLocation}
          userAuth={this.state.user_auth}
          userBars={this.state.userBars} />
      </div>
    )
  }
}

export default MainContainer;
