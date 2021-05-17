import styled from "styled-components"
import NavBar from './NavBar';

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const Content = styled.div`
    padding: 1rem;
    border: 1px solid #eee;
    box-shadow: 1px 1px #ccc;
    border-radius: 6px;
`;

const Layout = ({ children }) => {
    return (
        <Container>
            <NavBar />
            <Content>
                {children}
            </Content>
        </Container>
    )
};

export default Layout;