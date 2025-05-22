import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <main className="flex min-h-screen w-full justify-between font-inter overflow-hidden">
      <div className="overflow-auto">
        {children}
      </div>
      <div className="auth-asset">
        <Image
        src="/icons/auth-image.svg"
        alt="Auth image"
        width={500}
        height={500}
        />
      </div>
    </main>
)}
