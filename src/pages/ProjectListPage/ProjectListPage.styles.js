import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 5rem;
  height: 100%;
  width: 100%;

  .ant-pagination {
    text-align: right;
  }
`

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
`

const FieldName = styled.h2`
  margin: 1.6rem 0;
  font-size: 1.5rem;
  font-weight: 400;
  color: ${(props) => props.theme.color.primary4};
`

export {
  Wrapper,
  FieldName,
  Controls
}
