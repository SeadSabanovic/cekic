import "./(frontend)/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bs-BA">
      <body>{children}</body>
    </html>
  );
}