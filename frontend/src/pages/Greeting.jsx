import { SearchBar } from "../components/Search";
import { Title } from "../components/Texts";
import { ArrowAnimation } from "../components/ArrowAnimation";
import styled from "styled-components";

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  text-align: right;
  width: 100%;
  position: absolute;
  right: 0;
  top: 30vh;
`;

export function Greeting({ translateX, opacity }) {
  return (
    <>
      <TitleBox>
        <Title rx="10">2024</Title>
        <Title rx="20">지역연계</Title>
      </TitleBox>
      <ArrowAnimation bottom="20vh" />
    </>
  );
}