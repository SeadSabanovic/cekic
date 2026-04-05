import "./(frontend)/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bs-BA" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}