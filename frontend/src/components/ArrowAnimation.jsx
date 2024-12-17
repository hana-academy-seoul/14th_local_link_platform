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

// 애니메이션을 적용한 컨테이너
const Arrow = styled.div`
  display: inline-block;
  font-size: 2rem;
  color: #555;
  animation: ${moveLeft} 2s infinite; /* 애니메이션 설정 */
  position: relative;
  top: 70vh;
  left: 50px;
`;

export function ArrowAnimation() {
  return <Arrow>{"<<< Swipe Next"}</Arrow>;
}