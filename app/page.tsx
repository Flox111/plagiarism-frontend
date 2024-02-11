import { LoginForm } from "./components/login/LoginForm";

export default function Home() {
  return (
    <section className="bg-dark-gray-10 min-h-screen pt-20">
      <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
        <LoginForm />
      </div>
    </section>
  );
}
