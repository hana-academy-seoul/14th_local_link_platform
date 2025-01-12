import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { VideoModal } from './VideoModal';

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

const ArticleButton = styled.button`
  background: #1d8352;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 200%;
  width: 40%;
  margin-top: 10px;
  &:hover {
    background: #1db522;
  }
`;

const VideoButton = styled.button`
  background: #2196F3;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 200%;
  width: 40%;
  margin-top: 10px;
  margin-left: 10px;
  &:hover {
    background: #00BFAE;
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
  height: 60%;
  max-height: 40vh;
  overflow-y: auto;
`;

export const ArticleModal = ({ title, authors, keywords, abstract, id, onClose }) => {
  const [btnTxt, setBtnTxt] = useState('논문 열람하기');
  const [videoUrl, setVideoUrl] = useState('');
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoIds = ['ME8219', 'ME8160', 'ME5890']; 
  const urls = ['https://drive.google.com/file/d/1HdSzFHl0pkiyOBvzuoHbp8OJfF5I7liR/preview', 'https://drive.google.com/file/d/11QEVJAQXKrL5mQx4Rat6Qbt161t-wrEo/preview', 'https://drive.google.com/file/d/11VOKOxANVUgiO9hZeckdopb65iMIQHyI/preview'];
  const client = axios.create();
  const handleDownload = async () => {
    setBtnTxt('다운로드 중...');
    try {
      const response = await client.post(
        'https://locallink.hasclassmatching.com/paperGet',
        { data: id },
        { responseType: 'blob' } // 서버로부터 blob 데이터 받기
      );
  
      if (response.data.size === 0) {
        throw new Error("서버에서 받은 파일 데이터가 비어 있습니다.");
      }
  
      const blob = new Blob([response.data], { type: 'application/pdf' }); // Blob 생성
      const url = window.URL.createObjectURL(blob); // Blob URL 생성
      const a = document.createElement('a'); // 임시 앵커 태그 생성
      a.href = url;
      a.download = `${title}.pdf`; // 다운로드될 파일 이름
      document.body.appendChild(a); // 앵커 태그 추가
      a.click(); // 클릭 이벤트 발생
      document.body.removeChild(a); // 앵커 태그 제거
      window.URL.revokeObjectURL(url); // Blob URL 해제
    } catch (error) {
      console.error('파일 다운로드 실패:', error);
      alert('파일을 다운로드할 수 없습니다.');
    }
    setBtnTxt('논문 열람하기');
  };

  const handleVideo = () => {
    setIsVideoOpen(true);
    if (id === 'ME8219') {
      setVideoUrl(urls[0]);
    } else if (id === 'ME8160') {
      setVideoUrl(urls[1]);
    } else if (id === 'ME5890') {
      setVideoUrl(urls[2]);
    }
  }

  if (isVideoOpen) {
    return <VideoModal url={videoUrl} onClose={() => {
      setIsVideoOpen(false)
      onClose();
    }}  title={title}/>;
  } else {
    return (
      <ModalOverlay onClick={onClose}>
        <ModalWrapper>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <TextWrapper>
              <Title>{title}</Title>
              <hr />
              <Subtitle>{`저자: ${authors.join(', ')}`}</Subtitle>
              <Subtitle>{`키워드: ${keywords.join(', ')}`}</Subtitle>
              <Subtitle>초록</Subtitle>
              <CaptionWrapper>
                <Caption>{abstract}</Caption>
              </CaptionWrapper>
            </TextWrapper>
            <ArticleButton onClick={handleDownload}>{btnTxt}</ArticleButton>
            {videoIds.includes(id) ? <VideoButton onClick={handleVideo}>영상 보기</VideoButton> : null}
          </ModalContent>
        </ModalWrapper>
      </ModalOverlay>
    );
  }
};