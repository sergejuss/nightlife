import React, { PropTypes } from 'react';
import styles from '../styles';

const GoingLoggedOut = (props) => {
  return (
    <a href="/auth/twitter">
      <div className="">
        <button className="btn btn-lg"
          style={styles.going}>
          {props.persons} IS GOING
        </button>
      </div>
    </a>
  )
}

GoingLoggedOut.propTypes = {
  persons: PropTypes.string
}

GoingLoggedOut.defaultProps = {
  persons: '0'
}

export default GoingLoggedOut
