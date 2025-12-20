import Header from "@/components/shared/header/header";
import Footer from "@/components/shared/footer/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
