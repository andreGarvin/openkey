import React from 'react';

// components
import NotificationBanner from '../NotificationBanner';
import Card from '../Card/SubmitKeyCard';
import Footer from '../Footer';

// styles
import { Main, Container } from './style';

export default () => {
  return (
    <React.Fragment>
      <Main className="main submit">
        <NotificationBanner />

        <Container className="container">
          <Card />
          <Footer />
        </Container>
      </Main>
    </React.Fragment>
  );
};
