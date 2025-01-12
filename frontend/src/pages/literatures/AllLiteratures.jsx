import { Article } from "../../components/Article"
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';

const PaperContainer = styled.div`
    padding: 16px;
    overflow-y: scroll;
    height: 80%;
`;

export function AllLiteratures() {
    const client = axios.create();
    const [initialID, setInitialID] = useState([]);
    const [articles, setArticles] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("likedArticles")) {
            try {
                const parsedList = JSON.parse(localStorage.getItem("likedArticles")); // 문자열화된 리스트를 객체로 변환
                setInitialID(parsedList); // 변환된 객체를 상태
            } catch (error) {
                console.error("로컬스토리지 데이터 파싱 실패:", error);
                setInitialID([]); // 파싱 실패 시 기본값 설정
            }
        } else {
            setInitialID([]); // 로컬스토리지에 값이 없을 때 기본값 설정
        }
    }, []);

    useEffect(()=>{
        client.get('https://locallink.hasclassmatching.com/paperListAll')
        .then((response) => {
            console.log(response);
            setArticles(response.data);
            setIsLoaded(true);
        })
        .catch((error) => {
            console.error(error);
        })
    },[])

    return (
        <PaperContainer>
        {
            isLoaded ? articles.map((article) => {
                return <Article title={article.title} authors={article.authors} affiliation={article.type} keywords={article.keywords} id={article.id} initialLike={initialID.includes(article.id)} abstract={article.abstract} />
            })
            : <center style={{height: '100%', justifyContent: 'center', alignContent:'center', fontSize:'1vh'}}>로딩 중...</center>
        }
        </PaperContainer>
    )
}