import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    padding: 0;

    display: flex;
    justify-content: center;
  }

  #root {
    width: 900px;
    min-height: 100vh;
    margin: 0 auto;

    display: flex;
    justify-content: center;
  }

  div {
    box-sizing: border-box;
  }

  button {
    border: none;
    cursor: pointer;
  }

  input, textarea{
    outline: none;
  }

  ul li {
    list-style: none;
  }
`

export default GlobalStyle
