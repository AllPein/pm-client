import { Menu } from 'antd'
import React, { useState } from 'react'
import { BoardComponent } from '@/containers/BoardComponent'
import * as UI from './TasksPage.styles'
import { CheckSquareOutlined, FundOutlined } from '@ant-design/icons'
import { TasksComponent } from '@/containers/TasksComponent'

const getItem = (
  label,
  key,
  icon,
  children,
  type
) => ({
  key,
  icon,
  children,
  label,
  type,
})

const menuItems = [
  getItem('Доска', 'board', <FundOutlined />),
  getItem('Все задачи', 'tasks', <CheckSquareOutlined />),
];

const TasksPage = () => {
  const [currentMode, setCurrentMode] = useState('board');

  const handleSelectMenuItem = (item) => {
    setCurrentMode(item.key);
  }
  return (
    <UI.Wrapper>
      <UI.Sidebar>
        <Menu
          style={{ height: '100%', paddingTop: '3rem' }}
          defaultSelectedKeys={[currentMode]}
          mode="inline"
          onSelect={handleSelectMenuItem}
          items={menuItems}
        />
      </UI.Sidebar>
      
      { currentMode === 'board' ?
        <BoardComponent /> :
        <TasksComponent />
      }
    </UI.Wrapper>
  )
}

export {
  TasksPage
}