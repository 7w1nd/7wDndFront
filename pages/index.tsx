import { API_URL } from "../consts";

const Home = ({ systems }) => {
  // Render posts...
  return (
    <div>
      <p>{systems.map(a => a.name).join(', ')}</p>
    </div>
  );
}

// This function gets called at build time getServerSideProps
export const getStaticProps = async () => {
  const res = await fetch(`${API_URL}/api/systems`)
  const resp = await res.json()
  return {
    props: {
      systems: resp ? resp.data : [],
    },
  }
}

export default Home