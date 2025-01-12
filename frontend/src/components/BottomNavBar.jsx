import React, { useState, useEffect } from "react";
import { FaHeart, FaBook, FaFilm, FaPaintBrush, FaHome } from "react-icons/fa";
import styled from "styled-components";
import { Link } from "react-router-dom"; // Link 컴포넌트 추가
import { useLocation } from "react-router-dom";

const NavbarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  height: 8vh;
  border-radius: 35px 35px 0 0; /* 둥근 형태 */
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 10px;

  & svg {
    font-size: 65px;
    color: ${(props) => (props.isActive ? "#1D8352" : "#aaa")};
    transition: color 0.3s;
  }

  & span {
    margin-top: 5px;
    font-size: 30px;
    color: ${(props) => (props.isActive ? "#1D8352" : "#aaa")};
  }

  &:hover svg {
    color: #1DB522;
  }
`;

export const BottomNavBar = () => {
  const location = useLocation(); // 현재 URL 경로를 가져옴
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const path = location.pathname.split("/")[1]; // 경로의 첫 부분만 추출
    setActiveTab(path || "home"); // 경로가 없으면 기본값 'home'으로 설정
}, [location]);

  return (
    <NavbarContainer>
      <Link to="/academic" style={{ textDecoration: 'none' }}>
        <NavItem isActive={activeTab === "academic"} onClick={() => setActiveTab("academic")}>
          <FaBook />
          <span>학술</span>
        </NavItem>
      </Link>
      <Link to="/media" style={{ textDecoration: 'none' }}>
        <NavItem isActive={activeTab === "media"} onClick={() => setActiveTab("media")}>
          <FaFilm />
          <span>미디어</span>
        </NavItem>
      </Link>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <NavItem isActive={activeTab === "home"} onClick={() => setActiveTab("home")}>
          <FaHome />
          <span>전체</span>
        </NavItem>
      </Link>
      <Link to="/design" style={{ textDecoration: 'none' }}>
        <NavItem isActive={activeTab === "design"} onClick={() => setActiveTab("design")}>
          <FaPaintBrush />
          <span>디자인</span>
        </NavItem>
      </Link>
      <Link to="/likes" style={{ textDecoration: 'none' }}>
        <NavItem isActive={activeTab === "likes"} onClick={() => setActiveTab("likes")}>
          <FaHeart />
          <span>찜</span>
        </NavItem>
      </Link>
    </NavbarContainer>
  );
};