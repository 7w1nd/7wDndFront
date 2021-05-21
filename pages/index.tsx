import { API_URL } from "../consts";
import { Container, H2 } from "../styles/global";
import FlexTable from '../components/FlexTable';

const Home = ({ characters }) => {
  characters = characters.map(a => {
    return [a._id, a.system.name, a.name, a.level, a.currentExp, a.race, a.class, a.playerName, a.note];
  });
  return (
    <Container>
      <H2> Созданные персонажи </H2>
      <hr />
      <FlexTable header={[
        { name: "Id", width: '0', orderable: false },
        { name: "System", width: '9rem', orderable: true },
        { name: "Name", width: '8rem', orderable: true },
        { name: "Level", width: '7rem', orderable: true },
        { name: "Current Experience", width: '8rem', orderable: true },
        { name: "Race", width: '7rem', orderable: true },
        { name: "Class", width: '7rem', orderable: true },
        { name: "Player Name", width: '6rem', orderable: true },
        { name: "Note", width: '12rem', orderable: false },
      ]}
        rows={characters}></FlexTable>
    </Container>
  );
}

// This function gets called at build time getServerSideProps
export const getStaticProps = async () => {
  const res = await fetch(`${API_URL}/api/characters`)
  const resp = await res.json()
  return {
    props: {
      characters: resp ? resp.data : [],
    },
  }
}

export default Home