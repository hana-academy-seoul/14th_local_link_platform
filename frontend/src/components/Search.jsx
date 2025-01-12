import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Searchwrapper = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5%;
    margin-top: 15px;
    padding-top: 30px;
    padding-bottom: 30px;
`;

const SearchContainer = styled.div`
    display: flex;
    height: 80%;
    align-items: center;
    border-radius: 60px;
    border: 1px solid #ccc;
    padding: 5px 10px;
    padding-right: 20px;
    width: 70%;
    margin-left: 30px;
    background-color: #fff;
`;

const SearchInput = styled.input`
    border: none;
    outline: none;
    flex: 1;
    border-radius: 25px;
    padding: 5px 10px;
    font-size: 200%;
`;

const SearchIcon = styled(FaSearch)`
    color: #ccc;
    margin-left: 10px;
    font-size: 2vh;
    cursor: pointer;
`;

const AccountIcon = styled(FaUser)`
    color: #fff;
    background-color: #ccc;
    border-radius: 50%;
    padding: 8px;
    font-size: 80px;
`;

export const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/searched/${searchTerm}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <Searchwrapper>
            <AccountIcon onClick={()=>{navigate('/likes')}}/>
            <SearchContainer>
                <SearchInput
                    type="text"
                    placeholder="검색어 입력"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <SearchIcon onClick={handleSearch} />
            </SearchContainer>
        </Searchwrapper>
    );
};