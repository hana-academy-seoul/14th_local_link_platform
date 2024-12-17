import React from 'react';
import styled from 'styled-components';
import { FaSearch, FaUser } from 'react-icons/fa';

const Searchwrapper = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    margin-top: 15px;
`;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    border-radius: 25px;
    border: 1px solid #ccc;
    padding: 5px 10px;
    width: 300px;
    margin-left: 10px;
    background-color: #fff;
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

const AccountIcon = styled(FaUser)`
    color: #fff;
    background-color: #ccc;
    border-radius: 50%;
    padding: 8px;
    font-size: 18px;
`;

export const SearchBar = () => {
    return (
        <Searchwrapper>
            <AccountIcon />
            <SearchContainer>
                <SearchInput type="text" placeholder="검색어 입력" />
                <SearchIcon />
            </SearchContainer>
        </Searchwrapper>
    );
};