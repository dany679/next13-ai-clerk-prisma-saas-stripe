export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full bg-gray-900  overflow-auto ">
      <div className="h-full w-full mx-auto max-w-screen-xl ">{children}</div>
    </main>
  );
}
