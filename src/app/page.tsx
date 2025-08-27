"use client";

// components
import Card from "src/app/Components/Card/SubmitKeyCard";
import Footer from "src/app/Components/Footer";
import Header from 'src/app/Components/Header';

// styles
import { Main, Container } from "src/app/Components/Views/style";

export default async function Page(props) {
  return (
    <Main className="main submit">
      <Header />

      <Container className="container">
        <Card />
        <Footer />
      </Container>
    </Main>
  );
}
