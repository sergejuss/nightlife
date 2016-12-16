import React, { PropTypes } from 'react';
import styles from '../styles';

const GoingLoggedIn = (props) => {
  return (
    <div className="">
      <button className="btn btn-lg" onClick={props.onGoing}
        style={styles.going}>
        {props.persons} IS GOING
      </button>
    </div>
  )
}

GoingLoggedIn.propTypes = {
  onGoing: PropTypes.func.isRequired,
  persons: PropTypes.string
}

GoingLoggedIn.defaultProps = {
  persons: '0'
}

export default GoingLoggedIn
