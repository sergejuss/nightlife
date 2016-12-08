import React, { PropTypes } from 'react';
import styles from '../styles';

const Bar = (props) => {
  return (
    <div className="col-sm-10 col-sm-offset-1" style={styles.bgRed}>
      <img src={props.img} className='img-rounded' style={styles.dispInline} />
      <h4>{props.name}</h4>
      <p>{props.location}</p>
      <p>{props.text}</p>
    </div>
  )
}

Bar.propTypes = {

}

export default Bar
