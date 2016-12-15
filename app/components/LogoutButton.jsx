import React, { PropTypes } from 'react';

const LogoutButton = (props) => {
  return (
    <a href="/logout">
      <button className="btn btn-lg btn-primary col-sm-2 col-sm-offset-1">
        LOGOUT
      </button>
  </a>
  )
}

export default LogoutButton
