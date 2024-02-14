import { SetupData } from "./components/setupdata/SetupData";

export default function Home() {
  return (
    <section className="bg-dark-gray-10 min-h-screen pt-16">
      <div className="container mx-auto my-auto flex justify-center items-center">
        <SetupData />
      </div>
    </section>
  );
}
