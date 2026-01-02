import './globals.css'

export const metadata = {
  title: 'Avtomatizacijski Center',
  description: 'Orodja za avtomatizacijo vsakdanjih opravil',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sl">
      <body>{children}</body>
    </html>
  )
}
