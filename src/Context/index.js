import React from 'react'

const ComponentContext = React.createContext({
  theme: 'LIGHT',
  activeTab: 'HOME',
  changeTheme: () => {},
  changeActiveTab: () => {},
})

export default ComponentContext
