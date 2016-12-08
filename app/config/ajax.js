import axios from 'axios';

module.exports = function(location) {
  return axios.get('/api/' + location)    
}
