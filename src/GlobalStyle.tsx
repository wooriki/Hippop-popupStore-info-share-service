import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}

// 에디터 설정
.ql-editor {
    strong {
        font-weight:bold;
    }
    em {
        font-style: italic;
    }
}
.ql-toolbar.ql-snow {
  width: 760px;
  border-radius: 18px 18px 0 0;
  border: 2px solid var(--fifth-color);
}
.ql-container.ql-snow  {
  height: 500px;
  border-radius: 0 0 18px 18px ;
  border: 2px solid var(--fifth-color);
}

// Color chip
:root {
    --primary-color: #eb455f; // King Pink
    --second-color: #2B3467; // Melange Navy
    --third-color: #E2EE32; // Lemon Yellow
    --fourth-color: #FFFDED; // Cream
    --fifth-color: #333333; // Deep Dark Gray
    --sixth-color: #ffb4bf; // Hover Primary color
  }

// Font-ENG / KOR
@font-face {
    font-family: 'RixYeoljeongdo_Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2102-01@1.0/RixYeoljeongdo_Regular.woff') format('woff');
}
@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
}

h1, h2, h3, h4, h5 {
  font-family: 'RixYeoljeongdo_Regular';
}  
body {
    font-family: 'Pretendard-Regular';
    max-width: 100%;
    min-width: 900px;
    // width:1920px;
    margin: 0 auto;
    background-color:var(--fourth-color);

    .react-datepicker__triangle  {
      &:after{
        border-bottom-color: #2B3467!important;
        border-top: none;
      }
   
    }
      /* day: 주말 날짜 */
      .react-datepicker__day:nth-child(1){ 
          color:#ff0000; /* 일요일 날짜*/
 
      }
      .react-datepicker__day:nth-child(7){
          color:#0000ff; /* 토요일 날짜 */

      }

    .react-datepicker {
    border: 2px solid #333333;
    box-shadow: 4px 4px  10px #33333380  ;
    border-radius: 18px;
    font-weight:600;

    .react-datepicker__header {
      background-color: #2B3467;
    
      border-bottom: none;
      border-radius: 16px 16px 0 0 ;

      .react-datepicker__day-names {
        display: none;
      
      }
    }
    
    .react-datepicker__month-container{
      border-radius: 18px;
    }
    .react-datepicker__week-number {
       color: red;
    }

    .react-datepicker__day--outside-month {
    cursor: default;
    color: gray; // 해당 달이 아니면 날짜 색상 변경해서 구분해주었다
  }
  }
}
a {
    text-decoration:none;
    color: black;
}

button {
    // background-color: #eb455f;
    border: 2px solid var(--fifth-color);
    border-bottom: 4px solid var(--fifth-color);
    border-radius: 18px;
    color: white;
    font-size: 16px;
    padding: 5px 10px;
    cursor: pointer;
    transition: filter 0.3s, transform 0.3s;
  
    &:hover {
      filter: brightness(120%);
    }
  
    &:active {
      transform: scale(0.95);
    }
  }

`;

export default GlobalStyle;
