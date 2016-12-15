import React, { PropTypes } from 'react';

const LoginButton = (props) => {
  return (
    <a href="/auth/twitter">
      <button className="btn btn-lg btn-primary col-sm-2 col-sm-offset-1">
        LOGIN WITH &nbsp; <span className="fa fa-twitter fa-lg"></span>
      </button>
  </a>
  )
}

export default LoginButton
