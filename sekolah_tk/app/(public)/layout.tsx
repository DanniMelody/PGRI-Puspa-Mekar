import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppFloating from "../components/WhatsAppFloating";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloating />
    </>
  );
}
