import Navigation from "./Navigation";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-base-200">
      <Navigation />

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
