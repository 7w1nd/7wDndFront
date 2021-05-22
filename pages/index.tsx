import { API_URL } from "../consts";
import { Container, H2 } from "../styles/global";
import FlexTable from '../components/FlexTable';
import { characterRepo } from "../repos/character.repo";

const Home = ({ characters }) => {
  return (
    <Container>
      <H2> Созданные персонажи </H2>
      <hr />
      <FlexTable headers={[
        { name: "_id", title: "Id", width: '0', orderable: false, filterable: false },
        { name: "system.name", title: "System", width: '9rem', orderable: true, filterable: true },
        { name: "name", title: "Name", width: '8rem', orderable: true, filterable: true },
        { name: "level", title: "Level", width: '7rem', orderable: true, filterable: false },
        { name: "currentExp", title: "Current Experience", width: '8rem', orderable: true, filterable: false },
        { name: "race", title: "Race", width: '7rem', orderable: true, filterable: true },
        { name: "class", title: "Class", width: '7rem', orderable: true, filterable: true },
        { name: "playerName", title: "Player Name", width: '6rem', orderable: true, filterable: true },
        { name: "note", title: "Note", width: '12rem', orderable: false, filterable: false, },
      ]}
        root='characters'
        repo={characterRepo}
        rows={characters}></FlexTable>
    </Container>
  );
}

// This function gets called at build time getServerSideProps
export const getStaticProps = async () => {
  return {
    props: {
      characters: await characterRepo.getAll().catch(e => { console.log(e); return [] }),
    },
  }
}

export default Home