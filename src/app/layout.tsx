import Nav from "@/components/Nav";
import "./globals.css";

export const metadata = {
  title: "Chatify",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-tc bg-primary font-mono">
        <Nav />
        <div className="ml-[6%]">{children}</div>
      </body>
    </html>
  );
}
