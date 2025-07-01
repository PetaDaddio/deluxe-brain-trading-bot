import './globals.css'

export const metadata = {
  title: 'Deluxe Brain Trading Bot - Solana Whale Intelligence',
  description: 'Advanced Solana Whale Intelligence System with Linda Bradford Raschke Trading Methodology',
  keywords: ['solana', 'whale-tracker', 'crypto', 'trading', 'defi', 'linda-bradford-raschke'],
  authors: [{ name: 'Linda Bradford Raschke & Claude' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  )
}
