import React, {useState} from 'react';
import styled from 'styled-components';
import { FaHeart, FaArrowRight } from 'react-icons/fa';
import { ArticleModal } from './ArticleModal';

const PaperContainer = styled.div`
  padding: 16px;
  margin: 16px 0;
  padding: 30px;
`;

const Title = styled.h2`
  font-size: 2.5vh;

  margin: 0;
  color: #FFFFFF;
`;

const Authors = styled.p`
  font-size: 2.0vh;
  margin: 8px 0 4px;
  color: #FFFFFF;
`;

const Affiliation = styled.p`
  font-size: 2.0vh;
  margin: 4px 0;
  color: #FFFFFF;
`;

const Keywords = styled.p`
  font-size: 2.0em;
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
  font-size: 2vh;
  cursor: pointer;
  margin-top: 0;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const HeartIcon = styled(FaHeart)`
  font-size: 60px;
  margin-left: 8px;
  color: ${(props) => (props.isLike ? '#FF0000' : 'transparent')};
  stroke: #FFFFFF;
  stroke-width: 40px; /* 두께를 적당히 조정 */
  box-sizing: content-box; /* 테두리가 아이콘 안쪽으로 들어가지 않게 설정 */
  padding: 4px; /* 충분한 여백을 추가하여 잘리지 않도록 설정 */
`;

export const Article = ({ title, authors, affiliation, keywords, id, isLike, abstract }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

  return (
    <PaperContainer>
      <Title>{title}</Title>
      <Authors>{`저자: ${authors.join(', ')}`}</Authors>
      <Affiliation>{`소속: ${affiliation}`}</Affiliation>
      <Keywords>{`키워드: ${keywords.join(', ')}`}</Keywords>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '30px'}}>
        <Button onClick={handleModalOpen}>
          자세히 보기
          <FaArrowRight />
        </Button>
        <HeartIcon isLike={isLike} />
      </div>
      <hr style={{color: '#FFFFFF', marginTop:'70px', border: 'white solid 2px'}}/>

      {isModalOpen && <ArticleModal title={title} authors={authors} keywords={keywords} abstract={abstract} onClose={handleModalClose} />}
    </PaperContainer>
  );
};