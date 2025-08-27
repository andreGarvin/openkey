import React from 'react';

// components
import NotificationBanner from '../NotificationBanner';
import Card from '../Card/KeyInfoCard';
import Footer from '../Footer';

// styles
import { Main, Container } from './style';

const view = ({ params }) => {
  const { alias } = params;

  React.useEffect(() => {
    getKeyInfo(alias);
  }, [alias]);

  return (
    <React.Fragment>
      <Main className="main view">
        <NotificationBanner />

        <Container className="container">
          <Card
            // info={key}
          />
          <Footer />
        </Container>
      </Main>
    </React.Fragment>
  );
};

export default view;
