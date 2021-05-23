import { useEffect, useState } from "react";
import styled from "styled-components";
import { Container, H2, StyledButton, StyledSelect, StyledInput, TextArea } from "../styles/global";

const Modal = ({ show, onClose, children, title }) => {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = show ? (
        <StyledModalOverlay>
            <StyledModal>
                <StyledModalHeader>
                    {title && <Title>{title}</Title>}
                    <StyledButton href="#" onClick={handleCloseClick}>
                        x
                    </StyledButton>
                </StyledModalHeader>
                <hr />
                <StyledModalBody>{children}</StyledModalBody>
            </StyledModal>
        </StyledModalOverlay>
    ) : null;

    if (isBrowser) {
        return modalContent;
    } else {
        return null;
    }
};

const Title = styled.p`
    flex: auto;
    height: 18pt;
    overflow-y: hidden;
`;

const StyledModalBody = styled.div`
    padding-top: 10px;
`;

const StyledModalHeader = styled.div`
    display: flex;
    justify-content: flex-end;
    font-size: 25px;
`;

const StyledModal = styled.div`
    background: white;
    max-width: 500px;
    max-height: 600px;
    border-radius: 15px;
    padding: 15px;
    z-index: 7;
`;

const StyledModalOverlay = styled.div`
    z-index: 6;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
`;

export default Modal;