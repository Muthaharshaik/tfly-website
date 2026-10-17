import './globals.css'

export const metadata = {
  title: 'TFly Engineering — IT Services & Telecom Engineering',
  description: 'TFly delivers enterprise IT solutions and end-to-end telecom engineering services — from cloud, cybersecurity & managed IT to OSP survey, design, and basemap production.',
  keywords: 'IT services, cloud solutions, cybersecurity, managed IT, OSP survey, telecom engineering, fiber network design, software development',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
