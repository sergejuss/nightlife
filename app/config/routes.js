import Main from '../components/Main';
import MainContainer from '../containers/MainContainer';
import Footer from '../components/Footer';

const routes = {
  // base component (wrapper for the whole application).
  component: Main,
  childRoutes: [

    {
      path: '/',
      component: MainContainer
    }

  ]
};

export default routes;
