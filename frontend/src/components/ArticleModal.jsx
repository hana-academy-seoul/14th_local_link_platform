import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

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

const CloseButton = styled.button`
  position: relative;
  left: 93%;
  bottom: 10px;
  background: transparent;
  color: #000000;
  border: none;
  font-size: 400%;
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
  height: 60%;
  max-height: 40vh;
  overflow-y: auto;
`;

const IframeWrapper = styled.iframe`
  width: 80%;
  height: 80%;
  border: none;
  background-color: #ffffff; /* PDF가 흰 배경으로 보이도록 */
`;

export const ArticleModal = ({ title, authors, keywords, abstract, id, onClose }) => {
  const [btnTxt, setBtnTxt] = useState("논문 열람하기");
  const [isViewingPDF, setIsViewingPDF] = useState(false); // PDF 뷰어 모달 상태
  const [pdfUrl, setPDFUrl] = useState(null); // PDF URL 상태

  const client = axios.create();

  const handleDownloadAndView = async () => {
    setBtnTxt("다운로드 중...");
    try {
      const response = await client.post(
        "https://locallink.hasclassmatching.com/paperGet",
        { data: id },
        { responseType: "blob" } // 서버로부터 blob 데이터 받기
      );

      if (response.data.size === 0) {
        throw new Error("서버에서 받은 파일 데이터가 비어 있습니다.");
      }

      const blob = new Blob([response.data], { type: "application/pdf" }); // Blob 생성
      const url = window.URL.createObjectURL(blob); // Blob URL 생성
      setPDFUrl(url); // PDF URL 저장
      setIsViewingPDF(true); // PDF 뷰어 모달 열기
      onClose(); // 현재 모달 닫기
    } catch (error) {
      console.error("파일 다운로드 실패:", error);
      alert("파일을 다운로드할 수 없습니다.");
    }
    setBtnTxt("논문 열람하기");
  };

  return (
    <>
      {!isViewingPDF ? (
        <ModalOverlay onClick={onClose}>
          <ModalWrapper>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <TextWrapper>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <Title>{title}</Title>
                <hr />
                <Subtitle>{`저자: ${authors.join(", ")}`}</Subtitle>
                <Subtitle>{`키워드: ${keywords.join(", ")}`}</Subtitle>
                <Subtitle>초록</Subtitle>
                <CaptionWrapper>
                  <Caption>{abstract}</Caption>
                </CaptionWrapper>
              </TextWrapper>
              <ArticleButton onClick={handleDownloadAndView}>{btnTxt}</ArticleButton>
            </ModalContent>
          </ModalWrapper>
        </ModalOverlay>
      ) : (
        <ModalOverlay onClick={() => setIsViewingPDF(false)}>
          <ModalWrapper>
            <IframeWrapper src={pdfUrl} />
          </ModalWrapper>
        </ModalOverlay>
      )}
    </>
  );
};