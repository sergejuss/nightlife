import React, { PropTypes } from 'react';
import Bar from '../components/Bar';
import { yelp_ajax, update_user_bars } from '../config/ajax';
import Loading from '../components/Loading.jsx';

class BarsContainer extends React.Component {

  constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
      barsData: [],
      userBars: this.props.userBars
			};
    this.handleGoing = this.handleGoing.bind(this);
    this.updateUserBars = this.updateUserBars.bind(this);
	}

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location !== prevProps.location
      && this.props.location!== "") {
      if (localStorage.getItem('bars_data') && localStorage.getItem('last_location')
        && localStorage.getItem('last_location') === this.props.location) {
          this.setState({
            isLoading: false,
            barsData: JSON.parse(localStorage.getItem('bars_data')),
            userBars: this.props.userBars
          })
          // console.log('localStorage loaded')
      } else {
        this.setState({
          isLoading: true
        });
        yelp_ajax(this.props.location)
          .then(function(data) {
            // console.log('BarsContainer= ', data.data);
            this.setState({
              isLoading: false,
              barsData: data.data,
              userBars: this.props.userBars
            });
            localStorage.setItem('last_location', this.props.location);
            localStorage.setItem('bars_data', JSON.stringify(data.data));
          }.bind(this))
          .catch(function(err) {
            console.log('Error in BarsContainer: ', err);
          })
      }
    }
  }

  handleGoing(bar) {
    var barsData = this.state.barsData;
    var userBars = this.state.userBars;
    for (var i=0; i<barsData.length; i++) {
      if (barsData[i]['id'] === bar.props.id) {
        if (userBars.indexOf(barsData[i]['id']) === -1) {
          barsData[i]['persons'] += 1;
          userBars.push(barsData[i]['id']);
          this.updateUserBars('add', barsData[i]['id']);
        } else {
          barsData[i]['persons'] -= 1;
          userBars.splice(userBars.indexOf(barsData[i]['id']), 1);
          this.updateUserBars('delete', barsData[i]['id']);
        }
        this.setState({
          barsData: barsData,
          userBars: userBars
        })
        localStorage.setItem('bars_data', JSON.stringify(barsData));
        break;
      }
    }
  }

  updateUserBars(action, bar) {
    update_user_bars(action, bar)
      .then(function(data) {
        // console.log(data.data);
      })
      .catch(function(err) {
        console.log('Error in BarsContainer/updateUserBars: ', err);
      })
  }

  render () {
    var bars = this.state.barsData.map(function(bar) {
      return (
        <Bar key={bar.id} name={bar.name} img={bar.img}
          location={bar.location} text={bar.text}
          phone={bar.phone} onGoing={this.handleGoing}
          persons={bar.persons.toString()} id={bar.id}
          userAuth={this.props.userAuth} />
      )
    }.bind(this));
    return (
      this.state.isLoading ? <Loading /> :
      <div className="col-sm-12 text-center">
        {bars}
      </div>
    )
  }
}

BarsContainer.propTypes = {
  location: PropTypes.string.isRequired,
  userAuth: PropTypes.bool.isRequired,
  userBars: PropTypes.array.isRequired
};

BarsContainer.defaultProps = {
  userBars: []
}

export default BarsContainer;
