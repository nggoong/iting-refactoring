import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin:0;
        padding:0;
        font-family: 'Pretendard-Regular';
    }
    
    input {
        border:2px solid lightgray;
    }

    input:focus {
        outline:none;
        border-color: ${({ theme }) => theme.colors.mainBlue};
    }

    button {
        cursor:pointer;
    }

    body {
        background:${({ theme }) => theme.colors.backgroundGray};
        overflow-y:scroll;
    }


`;

export default GlobalStyle;
