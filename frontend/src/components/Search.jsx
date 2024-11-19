import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    border-radius: 25px;
    border: 1px solid #ccc;
    padding: 5px 10px;
    width: 300px;
`;

const SearchInput = styled.input`
    border: none;
    outline: none;
    flex: 1;
    border-radius: 25px;
    padding: 5px 10px;
`;

const SearchIcon = styled(FaSearch)`
    color: #ccc;
    margin-left: 10px;
`;

export const SearchBar = () => {
    return (
        <SearchContainer>
            <SearchInput type="text" placeholder="검색어 입력" />
            <SearchIcon />
        </SearchContainer>
    );
};