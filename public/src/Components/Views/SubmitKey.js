import React from 'react';

// components
import ErrorBanner from '../ErrorBanner';
import Card from '../Card/SubmitKeyCard';
import Footer from '../Footer';

// styles
import { Main, Container } from './style';

export default () => {
  return (
    <React.Fragment>
      <Main className="main submit">
        <ErrorBanner />

        <Container className="container">
          <Card />
          <Footer />
        </Container>
      </Main>
    </React.Fragment>
  );
};
