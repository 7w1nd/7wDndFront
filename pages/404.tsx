import styled from "styled-components";
import Link from 'next/link'

const Container = styled.div`
    padding-top: 8rem;
    text-align: center;
`;

const NotFoundPage = ({ }) => {
    // Render posts...
    return (
        <Container>
            <h1>404 - Page Not Found</h1>
            <Link href="/">
                <a>Go back home</a>
            </Link>
        </Container>
    );
}
export default NotFoundPage