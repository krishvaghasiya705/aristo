import { metadata } from './metadata'
import ClientLayout from './client-layout'

export { metadata }

export default function RootLayout({ children }) {
  return <ClientLayout>{children}</ClientLayout>
}
