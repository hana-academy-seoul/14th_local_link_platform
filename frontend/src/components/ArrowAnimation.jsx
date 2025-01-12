import React from "react";
import styled, { keyframes } from "styled-components";

// 애니메이션 정의
const moveLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-20px); /* 왼쪽으로 이동 */
  }
  100% {
    transform: translateX(0); /* 원래 위치로 복귀 */
  }
`;

const gradientMove = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: 0% 0;
  }
`;

// 애니메이션을 적용한 컨테이너
const Arrow = styled.div`
  display: inline-block;
  font-size: 4vh;
  color: transparent; /* 텍스트 색상 투명 */
  background-image: linear-gradient(45deg, #a8c0ff, #3f4c81, #ff77ff, #80ff72); /* 홀로그램 느낌의 색상 */
  background-size: 400% 400%; /* 배경 크기를 확장하여 그라데이션이 부드럽게 흐르도록 */
  background-clip: text; /* 텍스트에 배경 그라데이션을 적용 */
  animation: ${moveLeft} 3s infinite, ${gradientMove} 8s linear infinite; /* 애니메이션을 자연스럽게 반복 */
  position: relative;
  top: 75vh;
  left: 20%;
`;

export function ArrowAnimation() {
  return <Arrow>{"<<< Swipe Next"}</Arrow>;
}