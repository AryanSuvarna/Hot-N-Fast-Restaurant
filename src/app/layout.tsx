import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Notifications from '@/components/Notifications'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthProvider from '@/components/AuthProvider'
import QueryProvider from '@/components/QueryProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const montserrat_init = Montserrat({
    subsets: ['latin'],
    weight: ["500", "700"],
    variable: "--font-montserrat"
})



export const metadata: Metadata = {
    title: "Hot N' Fast",
    description: 'Best Fast Food in the 6ix',
    icons: {
        icon: '/logo.png',
    },

}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={montserrat_init.className}>
                <AuthProvider>
                    <QueryProvider>
                        <div>
                            <Notifications />
                            <Navbar />
                            {children}
                            <Footer />
                            <ToastContainer position='bottom-right' theme='light' autoClose={4000} draggable={false} />
                        </div>
                    </QueryProvider>
                </AuthProvider>
            </body>
        </html>
    )
}
