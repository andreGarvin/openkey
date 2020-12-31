import { Switch, Route, Redirect } from 'react-router-dom';
import style from 'styled-components';
import React from 'react';

// redux
import * as navigate from '../redux/thunks/navigate';
import { connection as connect } from '../redux';

// components
import SubmitKeyView from './Views/SubmitKey';
import KeyInfoView from './Views/KeyInfo';
import Header from './Header';

const ApplicationContainer = style.div`
  height: 100%;
  display: flex;
  min-width: 790px;
  background-color: #fff;
  flex-direction: column;
`;

const App = ({ state, history, dispatch }) => {
  const { path } = state.navigate;

  React.useEffect(() => {
    if (path) {
      history.push(path);

      dispatch(navigate.removeNavigation());
      // return <Redirect to={path} />;
    }
  });

  return (
    <ApplicationContainer className="application">
      <Header />
      <Switch>
        <Route exact path="/" component={SubmitKeyView} />

        <Route path="/view/:alias" component={KeyInfoView} />

        {/* <Route path="/:alias" component={TransportView} /> */}
      </Switch>
    </ApplicationContainer>
  );
};

export default connect(App);
