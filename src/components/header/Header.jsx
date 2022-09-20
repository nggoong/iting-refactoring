import React from 'react';
import styled from 'styled-components';
import Search from './Search';
import PageTitle from './PageTitle';

const Header = ({ title, isAction, postActions }) => {


    return(
        <HeaderWrapper>
            <PageTitle title={title} isAction={isAction} postActions={postActions}></PageTitle>
            <Search></Search>
        </HeaderWrapper>
    )
}

export default Header;

const HeaderWrapper = styled.div`
    position:fixed;
    top:0;
    left:0;
    /* height:60px; */
    width:100%;
    max-width:480px;
    left: 50%;
    transform: translate(-50%, 0);
    margin:0 auto;
    background:white;
    z-index:10;
    
`