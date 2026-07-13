"use client";

import Head from "next/head";

// components
import Card from "src/app/Components/Card/SubmitKeyCard";
import Footer from "src/app/Components/Footer";
import Header from 'src/app/Components/Header';

// styles
import { Main, Container } from "src/app/Components/Views/style";

export default function Page(props) {
  return (
    <Main className="main submit">
      <Head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico"></link>
      </Head>
      <Header />

      <Container className="container">
        <Card />
        <Footer />
      </Container>
    </Main>
  );
}
