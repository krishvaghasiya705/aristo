import { metadata } from './metadata'
import ClientLayout from './client-layout'
import { LanguageProvider } from './context/LanguageContext'

export { metadata }

export default function RootLayout({ children }) {
  return (
    <LanguageProvider>
      <ClientLayout>{children}</ClientLayout>
    </LanguageProvider>
  )
}
