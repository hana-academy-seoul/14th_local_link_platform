import React from 'react';
import styled, { css } from 'styled-components';

const positionStyles = css`
    ${({ x }) => x && `left: ${x}px;`}
    ${({ y }) => y && `top: ${y}px;`}
    ${({ rx }) => rx && `right: ${rx}px;`}
    ${({ ry }) => ry && `bottom: ${ry}px;`}
`;

export const Title = styled.h1`
    font-size: 3em;
    font-weight: 400;
    margin: 0.5em 0;
    position: relative;
    ${positionStyles}
`;

export const Subtitle = styled.h2`
    font-size: 1.5em;
    font-weight: semi-bold;
    margin: 0.5em 0;
    ${positionStyles}
`;

export const Caption = styled.p`
    font-size: 1em;
    color: gray;
    margin: 0.5em 0;
    ${positionStyles}
`;