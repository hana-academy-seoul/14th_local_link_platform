import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 100%;
`;

const ModalContent = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  max-height: 80%;
  overflow-y: auto;
  width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 10px;
`;

const TextWrapper = styled.div`
    overflow-y: auto;
    max-height: 500px;
`

const ArticleButton = styled.button`
  background: #1D8352;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  margin-top: 10px;

  &:hover {
    background: #1DB522;
  }
`;

const CloseButton = styled.button`
  position: relative;
  left: 95%;
  top: -10px;
  background: transparent;
  color: #000000;
  border: none;
  font-size: 1.5em;
  cursor: pointer;

  &:hover {
    color: #d32f2f;
  }
`;

export const ArticleModal = ({ title, abstract, onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
        <ModalWrapper>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <TextWrapper>
                    <h2>{title}</h2>
                    <hr/>
                    <h3>초록</h3>
                    <p>{abstract}</p>
                </TextWrapper>
                <ArticleButton onClick={()=>{}}>논문 열람하기</ArticleButton>
            </ModalContent>
        </ModalWrapper>
    </ModalOverlay>
  );
};