import "./globals.css";
import {CommonContextProvider} from "@/context/CommonContext";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`antialiased`}>
            <CommonContextProvider>
                {children}
            </CommonContextProvider>
        </body>
        </html>
    );
}
