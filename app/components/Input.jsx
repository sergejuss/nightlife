import React, { PropTypes } from 'react';
import styles from '../styles';
import LoginButton from './LoginButton.jsx';
import LogoutButton from './LogoutButton.jsx';

const Input = (props) => {
  return (
    <div className="col-sm-12" style={styles.bottom20}>

        <div className="">
          {props.userAuth ? <LogoutButton /> : <LoginButton />}
          <input className="input-lg col-sm-6"
            placeholder={props.submitedLocation===""?"Your location":props.submitedLocation}   
            onChange={props.onUpdateLocation} value={props.location} type="text"
            style={styles.spaceLeft} />
          <button className="btn btn-lg btn-primary col-sm-2" style={styles.spaceLeft}
            onClick={props.onSubmitLocation}>
            GO
          </button>
        </div>

    </div>
  )
}

Input.propTypes = {
  location: PropTypes.string,
  submitedLocation: PropTypes.string.isRequired,
  onUpdateLocation: PropTypes.func.isRequired,
  onSubmitLocation: PropTypes.func.isRequired,
  userAuth: PropTypes.bool.isRequired
}

export default Input
