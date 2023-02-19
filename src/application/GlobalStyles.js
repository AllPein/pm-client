import { createGlobalStyle } from 'styled-components'
import '@/assets/fonts/fonts.css'

export const GlobalStyles = createGlobalStyle`
  .react-kanban-column {
    width: 23rem;
  }


  p, h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }
  html {
    font-size: 62.5%; /* 10px */
  }

  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .root {
    height: 100%;
    width: 100%;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .selectable.table tr {
    cursor: pointer;
  }

  .ui.grid .ui.fitted.divider {
    margin: 0 1rem;
  }

  .ant-layout {
    background-color: white;
    height: 100%;
    width: 100%;
  }

  * {
    ::-webkit-scrollbar {
      width: 0.8rem;
      height: 0.8rem;
    }

    ::-webkit-scrollbar-track {
      border-radius: 0.8rem;
      background: ${(props) => props.theme.color.primary3};
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 0.8rem;
      background: ${(props) => props.theme.color.grayscale15};
    }

    scrollbar-color: ${(props) => `${props.theme.color.grayscale15} ${props.theme.color.primary3}`};
    scrollbar-width: thin;
  }
`
