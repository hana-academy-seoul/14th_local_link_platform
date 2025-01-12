import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { FaHeart, FaRegHeart, FaArrowRight } from 'react-icons/fa';
import { ArticleModal } from './ArticleModal';

const PaperContainer = styled.div`
  padding: 16px;
  margin: 16px 0;
  padding: 30px;
`;

const Title = styled.h2`
  font-size: 250%;

  margin: 0;
  color: #FFFFFF;
`;

const Authors = styled.p`
  font-size: 150%;
  margin: 8px 0 4px;
  color: #FFFFFF;
`;

const Affiliation = styled.p`
  font-size: 150%;
  margin: 4px 0;
  color: #FFFFFF;
`;

const Keywords = styled.p`
  font-size: 150%;
  margin: 4px 0;
  color: #FFFFFF;
`;

const Button = styled.button`
  width: 30vw;
  height: 4vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 50px;
  background-color: #FFFFFF;
  border: 1px solid #FFFFFF;
  color: #000000;
  font-size: 230%;
  cursor: pointer;
  margin-top: 0;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const HeartIcon = styled.div`
  font-size: 400%;
  margin-left: 8px;
  color: ${(props) => (props.isLike ? '#FF0000' : '#FFFFFF')}; /* 빨간색 또는 흰색으로 설정 */
  stroke: none;
`;

const Icon = ({ isLike, toggleLike }) => (
  <HeartIcon onClick={toggleLike} isLike={isLike} as={isLike ? FaHeart : FaRegHeart} />
);

export const Article = ({ title, authors, affiliation, keywords, id, initialLike, abstract }) => {
  const [isLike, setIsLike] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  useEffect(()=>{
    setIsLike(initialLike);
  }, [initialLike]);

  const toggleLike = () => {
    const likedArticles = JSON.parse(localStorage.getItem("likedArticles")) || [];
    if (isLike) {
      // 이미 좋아요 상태라면 ID 제거
      const updatedArticles = likedArticles.filter((articleId) => articleId !== id);
      localStorage.setItem("likedArticles", JSON.stringify(updatedArticles));
    } else {
      // 좋아요 상태가 아니라면 ID 추가
      likedArticles.push(id);
      localStorage.setItem("likedArticles", JSON.stringify(likedArticles));
    }
    setIsLike(!isLike); // 상태 업데이트
  };

  return (
    <PaperContainer>
      <Title>{title}</Title>
      <Authors>{`저자: ${authors.join(", ")}`}</Authors>
      <Affiliation>{`소속: ${affiliation}`}</Affiliation>
      <Keywords>{`키워드: ${keywords.join(", ")}`}</Keywords>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "30px" }}>
        <Button onClick={handleModalOpen}>
          자세히 보기
          <FaArrowRight />
        </Button>
        <Icon isLike={isLike} toggleLike={toggleLike} />
      </div>
      <hr style={{ color: "#FFFFFF", marginTop: "70px", border: "white solid 2px" }} />

      {isModalOpen && (
        <ArticleModal
          title={title}
          authors={authors}
          keywords={keywords}
          abstract={abstract}
          onClose={handleModalClose}
          id={id}
        />
      )}
    </PaperContainer>
  );
};