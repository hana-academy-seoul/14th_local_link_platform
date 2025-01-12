import React from 'react';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: #343a40;
    text-align: center;
`;

const NotFoundTitle = styled.h1`
    font-size: 6rem;
    margin: 0;
`;

const NotFoundSubtitle = styled.h2`
    font-size: 2rem;
    margin: 0;
`;

const NotFoundDescription = styled.p`
    font-size: 1.25rem;
    margin-top: 1rem;
`;

export const NotFound = () => {
    return (
        <NotFoundContainer>
            <NotFoundTitle>404</NotFoundTitle>
            <NotFoundSubtitle>Page Not Found</NotFoundSubtitle>
            <NotFoundDescription>
                Sorry, the page you are looking for does not exist.
            </NotFoundDescription>
        </NotFoundContainer>
    );
};