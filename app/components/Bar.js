import React, { PropTypes } from 'react';
import styles from '../styles';
import GoingLoggedIn from './GoingLoggedIn.jsx';
import GoingLoggedOut from './GoingLoggedOut.jsx';


class Bar extends React.Component {  //remove
  constructor() {
		super();
    this.transferBarData = this.transferBarData.bind(this);
	}

  transferBarData () {
    this.props.onGoing(this);
  }

  render () {
    return (
      <div className="col-sm-10 col-sm-offset-1 container-fluid" style={styles.barRow}>
        <div className="col-sm-2">
          <img src={this.props.img} className='img-rounded' style={styles.img} />
        </div>
        <div className="col-sm-8">
          <h3>{this.props.name}</h3>
          <p>{this.props.location}{', phone: ' + this.props.phone}</p>
          <p>{this.props.text}</p>
        </div>
        <div className="col-sm-2" style={styles.paddingLeftZero}>
          {this.props.userAuth ? (
            <GoingLoggedIn onGoing={this.transferBarData} persons={this.props.persons} />
          ) : (
            <GoingLoggedOut persons={this.props.persons} />
          )}
        </div>
      </div>
    )
  }
}

Bar.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string,
  location: PropTypes.string,
  text: PropTypes.string,
  phone: PropTypes.string,
  onGoing: PropTypes.func.isRequired,
  persons: PropTypes.string,
  userAuth: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
}

export default Bar
