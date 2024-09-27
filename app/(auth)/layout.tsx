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

        <div className="flex items-center justify-center h-full w-full bg-gradient-to-tr from-purple-300 via-purple-900 to-purple-950">

            {children}

        </div>

    )
}
