import React from 'react'
import { ModalProvider } from './ModalContext'
import { ThemeProvider } from './ThemeContext'
import { TokenProvider } from './TokenContext'
import { FolderProvider } from './FolderContext'
import { FormProvider } from './FormContext'
function AppProvider({children}) {
  return (
    <ThemeProvider>

      <ModalProvider>
          <TokenProvider>
            <FolderProvider>
              <FormProvider>
                {children}
              </FormProvider>
            </FolderProvider>
          </TokenProvider>
      </ModalProvider>
      </ThemeProvider>

  )
}

export default AppProvider
