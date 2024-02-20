import { Header } from "../components/header/Header";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow">main</main>
      <footer className="bg-dark-gray-25 shrink-0 h-[50px]">footer</footer>
    </div>
  );
}
