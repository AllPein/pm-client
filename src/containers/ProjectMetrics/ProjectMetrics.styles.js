import styled from 'styled-components'
import { SearchIcon } from '@/components/Icons/SearchIcon'

const Wrapper = styled.div`
  margin-top: 2rem;
`

const StyledSearchIcon = styled(SearchIcon)`
  color: ${(props) => props.theme.color.grayscale4};
`

const UsersWrapper = styled.div`
  margin-top: 2rem;
  max-height: 50rem;
  overflow-y: scroll;
`

const ModalWrapper = styled.div`
  height: 50rem;
`

export {
  StyledSearchIcon,
  UsersWrapper,
  ModalWrapper,
  Wrapper
}
