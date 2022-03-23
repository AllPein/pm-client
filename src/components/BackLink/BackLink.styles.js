import styled from 'styled-components'

const Link = styled.a`
  color: ${(props) => props.theme.color.primary2};
  text-decoration: inherit;
  cursor: pointer;
  transition: color 1s;
  
  &:hover {
    color: ${(props) => props.theme.color.primary2Lighter};
  }
`

const LinkContent = styled.span`
  padding-right: 0.9rem;
`

export {
  Link,
  LinkContent
}
