import "../styles/globals.css";
import "../styles/fonts.css";

import Footer from "./components/layout/Footer";
// import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";

export const metadata = {
  viewport: {
    width: 1440,
  },
};

export default function RootLayout({ children }) {
  return (
    <html style={{ fontFamily: "Nunito Sans" }}>
      <title>HALO ENERGY</title>
      <body>
        <div className="w-full overflow-clip ">
          <div className=" lg:hidden">
            {/* {pathname !== "/" && <Header className="lg:hidden" />} */}
            {/* <Header className="lg:hidden" /> */}
          </div>
          <Navbar />
          <main className="relative py-20">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
