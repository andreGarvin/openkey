import React from 'react';

// redux
import { connection as connect } from '../../redux';
import { getKeyInfo } from '../../redux/thunks/key';

// components
import NotificationBanner from '../NotificationBanner';
import Card from '../Card/KeyInfoCard';
import Footer from '../Footer';

// styles
import { Main, Container } from './style';

const view = ({ state, match, dispatch }) => {
  const { alias } = match.params;

  React.useEffect(() => {
    dispatch(getKeyInfo(alias));
  }, [alias]);

  const key = state.key.response;

  return (
    <React.Fragment>
      <Main className="main view">
        <NotificationBanner />

        <Container className="container">
          <Card info={key} />
          <Footer />
        </Container>
      </Main>
    </React.Fragment>
  );
};

export default connect(view);
