import OptionProvider from "@/util/optionContext"

export const metadata = {
  title: 'Worst Movie',
  // description: 'Generated by Next.js',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body style={{margin:0}}>
          <OptionProvider>
            {children}
          </OptionProvider>
      </body>
    </html>
  )
}