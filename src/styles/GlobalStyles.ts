"use client";

import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import theme from "./theme";

export default createGlobalStyle`
  ${reset};
  
  @font-face {
  font-family: "BaskervilleRegular";
  font-style: normal;
  font-weight: 400;
  src: url("/fonts/LibreBaskerville-Regular.ttf") format("truetype");
}

@font-face {
  font-family: "BaskervilleBold";
  font-style: normal;
  font-weight: 700;
  src: url("/fonts/LibreBaskerville-Bold.ttf") format("truetype");
}
@font-face {
  font-family: "BaskervilleItalic";
  font-style: italic;
  font-weight: 400;
  src: url("/fonts/LibreBaskerville-Italic.ttf") format("truetype");
}


  /* @font-face {
  font-family: 'Libre Baskerville';
  font-style: normal;
  font-weight: 400;
  src: url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400&display=swap') format('woff2');
}

@font-face {
  font-family: 'Libre Baskerville';
  font-style: normal;
  font-weight: 700;
  src: url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,700&display=swap') format('woff2');
}

@font-face {
  font-family: 'Libre Baskerville';
  font-style: italic;
  font-weight: 400;
  src: url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@1,400&display=swap') format('woff2');
} */

  @font-face {
    font-family: 'AppleSDGothicNeoEB';
    src: local("AppleSDGothicNeoEB"), url('/fonts/AppleSDGothicNeoEB.woff') format('woff');
    font-weight: 900;
    font-style: normal;
  }

  @font-face {
    font-family: 'AppleSDGothicNeoB';
    src: local("AppleSDGothicNeoB"), url('/fonts/AppleSDGothicNeoB.woff') format('woff');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'AppleSDGothicNeoSB';
    src: local("AppleSDGothicNeoSB"), url('/fonts/AppleSDGothicNeoSB.woff') format('woff');
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: 'AppleSDGothicNeoM';
    src: local("AppleSDGothicNeoM"), url('/fonts/AppleSDGothicNeoM.woff') format('woff');
    font-weight: 500;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'AppleSDGothicNeoR';
    src: local("AppleSDGothicNeoR"), url('/fonts/AppleSDGothicNeoR.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
    
    &::-webkit-scrollbar {
      display: none;
    }

    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
  }

  body {
    /* font-family: 'PretendardRegular', sans-serif; */
    scrollbar-width: none;
    -ms-overflow-style: none;
    /* background-color: #F5F7F9; */
    background-color: ${theme.colors.lightGrayBgColor};

    body::-webkit-scrollbar {
      display: none;
    }
  }

  a {
    color: ${({ theme }) => theme.colors.blackColor};
    text-decoration: none;
  }

  textarea {
    resize: none;
  }

  input,
  textarea {
    font-size: 16px;
    font-family: 'PretendardRegular';
    border: none;
    outline: none;
    background-color: inherit;

    &::placeholder {
      font-size: 14px;
      font-family: 'PretendardRegular', 'Roboto', sans-serif;
    }
    
    &:disabled {
      color: ${({ theme }) => theme.colors.blackColor};
    }
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  textarea:focus,
  input:focus {
    outline: none;
  }

  button {
    font-size: 16px;
    padding: 0;
    cursor: pointer;
    outline: none;
    border: none;
    background-color: ${({ theme }) => theme.colors.whiteColor};
  }

  select {
    border: none;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    cursor: pointer;
  }

  li {
    list-style: none;
  }

`;
