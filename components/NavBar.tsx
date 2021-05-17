import styled from "styled-components"
import Image from 'next/image';
import Link from "next/link";

const Nav = styled.nav`
  margin: 0 auto;
  padding: 0.4em;
  width: calc(100% - 40px);
  position: fixed;
  max-width: 1161px;
  background: #000;
  border-color: #c53131;
  padding: 0 20px;
  color: #a5afba;
  border-bottom-left-radius: 6pt;
  border-bottom-right-radius: 6pt;
`

const Ul = styled.ul`
  display: flex;
  padding: 0;
`

const Li = styled.li`
  display: block;
  padding: 0.4em;
  list-style: none;
  float: left;
  margin: auto 0;
`

const A = styled.a`
  color: #fff;
  padding: 28px 15px;
  text-transform: uppercase;
  text-align: center;
  display: block;
  text-decoration: none;
  &:hover {
    color: #ccc;
  }
`

const NavBar = () => (
  <Nav>
    <Ul>
      <Li>
        <Image src="/logo.png" alt="logo" height={90} width={210} />
      </Li>
      <Li>
        <Link href="/" passHref>
          <A>Characters</A>
        </Link>
      </Li>
      <Li>
        <Link href="/systems" passHref>
          <A>Systems</A>
        </Link>
      </Li>
    </Ul>
  </Nav>
)

export default NavBar
