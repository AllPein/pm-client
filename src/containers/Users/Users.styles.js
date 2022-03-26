import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 3rem 0rem 0rem;
  max-height: 60rem;
  overflow-y: scroll;
`

const FullNameBlock = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
`

const Roles = styled.div`
  margin-top: 1.5rem;
`

const RoleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem 0 0 0;
`

export {
  Wrapper,
  FullNameBlock,
  Roles,
  RoleWrapper
}
