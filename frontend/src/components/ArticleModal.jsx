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
  width: 90%;
  height: 70%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 10px;
`;

const TextWrapper = styled.div`
  height: 90%;
`

const ArticleButton = styled.button`
  background: #1D8352;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.5vh;
  width: 30%;
  margin-bottom: 20px;
  &:hover {
    background: #1DB522;
  }
`;

const CloseButton = styled.button`
  position: relative;
  left: 93%;
  bottom: 10px;
  background: transparent;
  color: #000000;
  border: none;
  font-size: 3vh;
  cursor: pointer;
  &:hover {
    color: #d32f2f;
  }
`;

const Title = styled.h1`
  font-size: 2vh;
  font-weight: 600;
  margin: 0.5em 0;
`;

const Subtitle = styled.h2`
  font-size: 1.5vh;
  font-weight: semi-bold;
  margin: 0.5em 0;
`;

const Caption = styled.p`
  font-size: 1.5vh;
  color: gray;
  margin: 0.5em 0;
`;

const CaptionWrapper = styled.div`
  margin: 0.5em 0;
  height: 75%;
  overflow-y: auto;
`;

export const ArticleModal = ({ title, authors, keywords, abstract, onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
        <ModalWrapper>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <TextWrapper>
                  <CloseButton onClick={onClose}>&times;</CloseButton>
                    <Title>{title}</Title>
                    <hr/>
                    <Subtitle>{`저자: ${authors.join(', ')}`}</Subtitle>
                    <Subtitle>{`키워드: ${keywords.join(', ')}`}</Subtitle>
                    <Subtitle>초록</Subtitle>
                    <CaptionWrapper>
                      <Caption>{abstract}</Caption>
                    </CaptionWrapper>
                </TextWrapper>
                <ArticleButton onClick={()=>{}}>논문 열람하기</ArticleButton>
            </ModalContent>
        </ModalWrapper>
    </ModalOverlay>
  );
};