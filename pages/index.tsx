import styled from "styled-components";
import { API_URL } from "../consts";
import Header from "./Header";
import styles from '../styles/index.module.scss';

const Title = styled.h1`
  color: red;
`;

function Home({ systems }) {
  // Render posts...
  return (
    <div>
      <Header />

      <p>{systems.map(a => a.name).join(', ')}</p>
      <Title className={styles.ololo}>Title</Title>
    </div>
  );
}

// This function gets called at build time getServerSideProps
export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/systems`)
  const resp = await res.json()
  return {
    props: {
      systems: resp ? resp.data : [],
    },
  }
}

export default Home