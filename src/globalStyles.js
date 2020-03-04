import { createGlobalStyle } from 'styled-components';


export default createGlobalStyle`

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.pageBackground}
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

* {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

h1, h2, h3, h4, h5, h6, .asTitle {
  font-family: ${props => props.theme.fonts.secondary};
}

button {
  display: block;
  outline: 0;
  border: 0;
  font-family: inherit;
}

a {
  text-decoration: none;
  color: inherit;
}

.flex {
  display: flex;
  flex: 1 1 wrap;
  justify-content: space-between;
  &.two {
    & > .column {
      max-width: calc(100% / 2);      
      flex-basis: calc(100% / 2);
    }
  }
  &.three {
    & > .column {
      max-width: calc(100% / 3);      
      flex-basis: calc(100% / 3);
    }
  }
}

label, input {
  display: block;
  width: 100%;
  font-size: 1.5rem;
}

label {
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  line-height: 1.6rem;
  color: rgba(255, 255, 255, .75);
}

input {
  outline: 0;
  color: white;
  font-family: inherit;
  line-height: 3rem;
  padding: 0 .8rem;
  background: rgba(255, 255, 255, .05);
  border: 1px solid transparent;
  transition: all .33s ease-in-out;
  &:focus {
    border-color: white;
  }
}

`;