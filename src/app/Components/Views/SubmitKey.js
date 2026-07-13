import React from 'react';

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
