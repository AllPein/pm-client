import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { ThemeProvider } from 'styled-components'
import { store } from '@/application/Provider/contexts/store';
import { history } from '@/utils/history';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { theme } from '@/application/theme/theme.default';


const Provider = (props) => (
  <ErrorBoundary>
    <ThemeProvider theme={theme}>
      <StoreProvider store={store}>
        <ConnectedRouter history={history}>
          {props.children}
        </ConnectedRouter>
      </StoreProvider>
    </ThemeProvider>
  </ErrorBoundary>
)

export {
  Provider
}