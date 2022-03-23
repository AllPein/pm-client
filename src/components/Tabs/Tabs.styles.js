import styled from 'styled-components'
import { Tabs as AntdTabs } from 'antd'

const TabContent = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`

const Tabs = styled(AntdTabs)`
  font-size: 1.4rem;
  font-weight: 600;

  .ant-tabs-tab {
    margin: 1rem 1.8rem !important;
  }

  .ant-tabs-tab:nth-child(1) {
    margin-left: 1rem;
  }

  .ant-tabs-nav-operations {
    display: none !important;
  }
`

export {
  TabContent,
  Tabs
}
