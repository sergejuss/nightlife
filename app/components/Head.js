import React, { PropTypes } from 'react';
import styles from '../styles';

const Head = (props) => {
  return (
    <div className="main-container">
      <div className="jumbotron col-sm-12 text-center" style={styles.bottom20}>
        <h1>'Plans tonight?'</h1>
        <h3>See which bars are hot tonight and plan ahead of time</h3>
        <h3>Pity it doesn't work in Lithuania yet</h3>
        <div className="col-sm-12">

            <div className="">
              <input className="input-lg col-sm-6 col-sm-offset-3" placeholder="Your location"
                onChange={props.onUpdateLocation} value={props.location} type="text" />
              <button className="btn btn-lg btn-primary col-sm-1" style={styles.spaceLeft}
                onClick={props.onSubmitLocation}>
                GO
              </button>
            </div>

        </div>
      </div>
    </div>
  )
}

Head.propTypes = {
  location: PropTypes.string,
  onUpdateLocation: PropTypes.func.isRequired,
  onSubmitLocation: PropTypes.func.isRequired
}

export default Head
