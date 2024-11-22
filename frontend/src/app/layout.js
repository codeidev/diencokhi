import { Inter } from "next/font/google";
import "../../public/assets/css/style.css";
// import "../../public/assets/script/navigationcomment";
// import "../../public/assets/script/paymoment";
import Header from "./header";
import Footer from "./footer";
import Providers from "../redux/Provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BM Điện cơ khí",
  description: "Dự án bán tài liệu của bộ môn",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js" />
      </body>
    </html>
  );
}
