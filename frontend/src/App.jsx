import { useState } from "react";
import { Greeting } from "./pages/Greeting";
import { Main } from "./pages/Main";

function App() {
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isSwiped, setIsSwiped] = useState(false);
  const [token, setToken] = useState(null);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;

    if (!isSwiped) {
      setTranslateX(deltaX);
    }
  };

  const handleTouchEnd = () => {
    // isSwiped가 false일 때만 변경
    if (!isSwiped && translateX < -100) {
      setIsSwiped(true); // 스와이프가 완료된 상태로 설정
    } else {
      setTranslateX(0); // 원래 위치로 되돌리기
    }
  };

  const handleScroll = (e) => {
    const deltaScroll = e.deltaY;

    // isSwiped가 false일 때만 변경
    if (!isSwiped && deltaScroll > 0) {
      setIsSwiped(true); // 스크롤로 스와이프 발생
    }
  };

  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#fff",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleScroll} // PC 스크롤 이벤트 처리
    >
      {/* Greeting */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          transform: `translateX(${isSwiped ? "-100%" : translateX}px)`,
          opacity: `${isSwiped ? 0 : 1}`,
          transition: isSwiped ? "transform 0.3s ease-in-out, opacity 0.3s ease-in-out" : "none",
          zIndex: 0,
          transformOrigin: "left center",
        }}
      >
        <Greeting />
      </div>

      {/* Example */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          transform: `translateX(${isSwiped ? "0" : "100%"}) scale(${isSwiped ? 1 : 0.8})`,
          opacity: `${isSwiped ? 1 : 0}`,
          transition: "transform 0.6s ease-in-out, opacity 0.6s ease-in-out, scale 0.6s ease-in-out",
          zIndex: 0,
          backgroundColor: "#1D8352",
        }}
      >
        <Main />
      </div>
    </div>
  );
}

export default App;