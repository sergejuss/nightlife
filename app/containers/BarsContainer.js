import React, { PropTypes } from 'react';
import Bar from '../components/Bar';
import ajax from '../config/ajax';

class BarsContainer extends React.Component {

  constructor() {
		super();
		this.state = {
			isLoading: true,
      barsData: []
			};
	}

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location !== prevProps.location) {
      ajax(this.props.location)
        .then(function(data) {
          console.log('BarsContainer= ', JSON.parse(data.data));
          this.setState({
            isLoading: false,
            barsData: JSON.parse(data.data).businesses
          });
        }.bind(this))
        .catch(function(err) {
          console.log('Error in BarsContainer: ', err);
        })
    }
  }

  render () {
    var bars = this.state.barsData.map(function(bar) {
      return (
        <Bar key={bar.id} name={bar.name} img={bar.image_url}
          location={bar.location.display_address[0]} text={bar.snippet_text} />
      )
    });
    return (
      <div className="col-sm-12 text-center">
        {bars}
      </div>
    )
  }
}

export default BarsContainer;
