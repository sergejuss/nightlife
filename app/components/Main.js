import React, { PropTypes } from 'react';
import styles from '../styles';
import Footer from './Footer';

const Main = (props) => {
  return (
    <div className="main-container">
      <div className="col-sm-12 text-center">
        <div className="jumbotron" style={styles.bottom20}>
          <h1>Plans tonight?</h1>
          <h3>See which bars are hot tonight and plan ahead of time</h3>
          <h3>Pity it doesn't work in Baltics yet</h3>
        </div>

        {props.children}

        <Footer />
      </div>
    </div>
  )
}

export default Main
