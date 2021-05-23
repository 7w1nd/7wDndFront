import { useRouter } from 'next/router';
import FlexTable from '../components/FlexTable';
import Modal from '../components/Modal';
import { Container, H2, StyledButton, StyledSelect } from "../styles/global";
import { characterRepo } from "../repos/character.repo";
import { useState } from "react";
import { systemRepo } from "../repos/system.repo";
import React from "react";

const Home = ({ characters, systems }) => {
  const [showModal, setShowModal] = useState(false);
  const systemSelect: any = React.createRef();
  const router = useRouter();
  return (
    <Container>
      <hr />
      <StyledButton type="button" onClick={() => setShowModal(true)}>Add new Character</StyledButton>
      <Modal title="Choose system for new character"
        onClose={() => setShowModal(false)}
        show={showModal}
      >
        <div style={{ display: 'grid' }}>
          <StyledSelect ref={systemSelect} name="system" id="system">
            {systems?.map((sys, i) => <option key={i} value={sys._id}>{sys.name}</option>)}
          </StyledSelect>
          <StyledButton onClick={() => router.push(`/characters/add/${systemSelect.current?.value}`)}>Continue...</StyledButton>
        </div>
      </Modal>
      <hr />
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
      systems: await systemRepo.getAll().catch(e => { console.log(e); return [] }),
    },
  }
}

export default Home