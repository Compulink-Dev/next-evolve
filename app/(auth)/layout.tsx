export const metadata = {
    title: 'Evolve Auth',
    description: 'Evolve Auth',

}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="flex items-center justify-center h-full w-full bg-gradient-to-tr from-blue-300 via-blue-900 to-blue-950">

                {children}

            </body>
        </html>
    )
}
