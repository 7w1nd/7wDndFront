import { API_URL } from "../consts";
import styled from "styled-components";
import { Container, H2 } from "../styles/global";
import Link from "next/link";

const UL = styled.ul`
    list-style-type: upper-roman;
`;
const Li = styled.li`
    padding: 1rem;

    & a {
        color: #210000;
        text-decoration: none;

        &:hover {
            color: #8f8383;
        }
    }

    & ul {
        list-style-type: none;

        & li {
            padding: 0.5rem;
        }
    }
`;

const Systems = ({ systems }) => {
    return (
        <Container>
            <H2> Available DnD Systems: </H2>
            <hr />
            <UL>
                {systems.map(a =>
                    <Li key={a._id}>
                        <Link href={`/system/${a._id}`} passHref>
                            <a>{a.name}</a>
                        </Link>
                        <ul>
                            <li>
                                <Link href={`/system/${a._id}/Attributes`} passHref>
                                    <a>Attributes</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/system/${a._id}/Skills`} passHref>
                                    <a>Skills</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/system/${a._id}/Races`} passHref>
                                    <a>Races</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/system/${a._id}/Classes`} passHref>
                                    <a>Classes</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/system/${a._id}/Feats`} passHref>
                                    <a>Feats</a>
                                </Link>
                            </li>
                        </ul>
                    </Li>
                )}
            </UL>
        </Container>
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

export default Systems;