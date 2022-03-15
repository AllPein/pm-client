import styled from 'styled-components'
import { SearchIcon } from '@/components/Icons/SearchIcon'
import { Input } from 'antd'

const Wrapper = styled.div`
  width: 32.5rem;
  height: 3.2rem;
`

const StyledInput = styled(Input)`
  height: 100%;
`

const StyledSearchIcon = styled(SearchIcon)`
  color: ${(props) => props.theme.color.grayscale4};
`

export {
  Wrapper,
  StyledInput as Input,
  StyledSearchIcon as SearchIcon
}
