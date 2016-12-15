import React, { PropTypes } from 'react';

var styles = {
  container: {
    fontSize: '45px'
  },
  content: {
    textAlign: 'center',
    width: '100%',
    marginTop: '30px'
  }
}

const NotAvailableMessage = (props) => {
  return (
    <div style={styles.container}>
      <p style={styles.content}>Sorry, no data is available for this location. Try another location.</p>
    </div>
  )
}

export default NotAvailableMessage
