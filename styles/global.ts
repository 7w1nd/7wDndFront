import styled from "styled-components";

export const Container = styled.div`
    padding-top: 7rem;
    font-size: 20pt;
`;

export const H2 = styled.h2`
    color: #333; 
`;

export const StyledButton = styled.button`
    padding: 1rem;
    border-radius: 3pt;
    box-shadow: 1pt 1pt #ccc;
    font-size: 14pt;
    margin: 1rem;

    & a {
        text-decoration: none;
        color: black;
    }
`;

export const StyledSelect = styled.select`
    padding: 0.25rem;
    border-radius: 3pt;
    box-shadow: 1pt 1pt #ccc;
    background-image: none !important;
    font-family: cursive;
    background: none !important;
    color: black;
    font-size: 16pt;
`;


export const StyledInput = styled.input`
    padding: 0.25rem;
    border-radius: 3pt;
    box-shadow: 1pt 1pt #ccc;
    font-family: cursive;
    background: none !important;
    color: black;
    font-size: 16pt;
    
    & img {
        background: none !important;
    }
`;

export const TextArea = styled.textarea`
    padding: 0.5rem;
    border-radius: 3pt;
    box-shadow: 1pt 1pt #ccc;
    font-family: cursive;
    width: inherit;
    margin-left: -6pt;
    background: none !important;
    color: black;
    font-size: 16pt;
`;