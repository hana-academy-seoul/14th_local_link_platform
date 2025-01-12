import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
  height: fit-content;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 10px;
`;

const TextWrapper = styled.div`
  height: 90%;
`;

const Title = styled.h1`
  font-size: 2vh;
  font-weight: 600;
  margin: 0.5em 0;
`;


export const VideoModal = ({ title, url, onClose }) => {

  return (
    <ModalOverlay onClick={onClose}>
      <ModalWrapper>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <TextWrapper>
            <Title>{title}</Title>
            <hr/>
          </TextWrapper>
          <iframe src={url} width="100%" height="480" allow="autoplay"></iframe>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  );
};