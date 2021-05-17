import { API_URL } from "../consts";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.div`
    padding-top: 7rem;
    font-size: 20pt;
`;

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

const H2 = styled.h2`
    color: #333; 
`;

const Systems = ({ systems }) => {
    // Render posts...
    return (
        <Container>
            <H2> Available DnD Systems: </H2>
            <hr />
            <UL>
                {systems.map(a =>
                    <Li>
                        <Link href={`/system/${a._id}`} passHref>
                            <a>{a.name}</a>
                        </Link>
                        <ul>
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

export default Systems