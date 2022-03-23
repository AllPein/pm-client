import PropTypes from 'prop-types'
import { childrenShape } from '@/utils/propTypes'
import { Tabs as AntdTabs, TabContent } from './Tabs.styles'

class Tab {
  constructor (
    key,
    title,
    content,
    hiddenPane = false
  ) {
    this.key = key
    this.title = title
    this.content = content
    this.hiddenPane = hiddenPane
  }
}

const tabShape = PropTypes.shape({
  key: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]),
  content: PropTypes.func.isRequired,
  hiddenPane: PropTypes.bool.isRequired
})

const Tabs = ({
  activeKey,
  animated = true,
  onChange,
  tabs,
  extra
}) => (
  <>
    <AntdTabs
      activeKey={activeKey.toString()}
      animated={animated}
      onChange={onChange}
      tabBarExtraContent={extra}
    >
      {
        tabs.map((tab) => !tab.hiddenPane && (
          <AntdTabs.TabPane
            key={tab.key}
            tab={tab.title}
          />
        ))
      }
    </AntdTabs>
    <TabContent>
      {
        tabs.find((t) => t.key === activeKey)?.content()
      }
    </TabContent>
  </>
)

Tabs.propTypes = {
  activeKey: PropTypes.string.isRequired,
  animated: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(tabShape).isRequired,
  extra: childrenShape
}

export {
  Tabs,
  Tab,
  tabShape
}
