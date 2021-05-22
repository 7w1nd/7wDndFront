import styled from "styled-components";
import Image from 'next/image';
import { API_URL } from "../../consts";
import { Container, H2 } from "../../styles/global";

const Header = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const HeaderCharacterInfo = styled.div`
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    & > div {
        margin: 1rem;
    }
`;

const Cell = styled.div`
    margin: auto;
`;

const Label = styled.label`
    font-style: italic;
    font-size: 16pt;
`;


const Character = ({ characterInfo }) => {
    console.log(characterInfo);
    return (
        <Container>
            <H2> {characterInfo.race} {characterInfo.class} {characterInfo.name} </H2>
            <hr />
            <Header>
                <Cell style={{ gridArea: "logo" }}><Image src="/pathfinder.png" alt="pathfinder logo" width={500} height={188} /></Cell>
                <HeaderCharacterInfo style={{ gridArea: "header" }}>
                    <Cell style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                        <Cell ><Label>Character Name:</Label> {characterInfo.name}</Cell>
                        <Cell ><Label>Player:</Label> {characterInfo.playerName}</Cell>
                        <Cell ><Label>Race:</Label> {characterInfo.race}</Cell>
                        <Cell ><Label>Class:</Label> {characterInfo.class}</Cell>
                    </Cell>
                    <Cell style={{ gridTemplateColumns: '1fr 1fr' }}>
                        <Cell ><Label>Level:</Label> {characterInfo.level}</Cell>
                        <Cell ><Label>Exp:</Label> {characterInfo.currentExp}</Cell>
                        <Cell ><Label>Alignment:</Label> {characterInfo.alignment}</Cell>
                        <Cell ><Label>God:</Label> {characterInfo.god ? characterInfo.god : '-'}</Cell>
                    </Cell>
                    <Cell style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr' }}>
                        <Cell ><Label>Size:</Label> {characterInfo.size}</Cell>
                        <Cell ><Label>Sex:</Label> {characterInfo.sex}</Cell>
                        <Cell ><Label>Age:</Label> {characterInfo.age}</Cell>
                        <Cell ><Label>Growth:</Label> {characterInfo.growth}</Cell>
                        <Cell ><Label>Weight:</Label> {characterInfo.weight}</Cell>
                        <Cell ><Label>Hair:</Label> {characterInfo.hair}</Cell>
                        <Cell ><Label>Eyes:</Label> {characterInfo.eyes}</Cell>
                    </Cell>
                </HeaderCharacterInfo>
            </Header>
        </Container>
    );
}

export async function getStaticPaths() {
    const res = await fetch(`${API_URL}/api/characters/`)
    const resp = await res.json()
    const paths = resp.data.map((character) => ({
        params: { id: character._id },
    }))
    return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {
    const res = await fetch(`${API_URL}/api/characters/details/${params.id}`)
    const resp = await res.json()
    return {
        props: {
            characterInfo: resp ? resp.data : [],
        },
    }
}

export default Character;