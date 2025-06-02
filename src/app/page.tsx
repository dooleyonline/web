import banner from "@/../public/images/banner.png";
import Image from "next/image";

const Home = () => {
  return (
    <main>
      <header className="w-full h-[30svh] min-h-[200px] max-h-[400px] rounded-xl overflow-hidden relative">
        <Image
          src={banner}
          alt="Site banner"
          fill
          placeholder="blur"
          className="object-cover"
        />

        <div className="relative size-full flex flex-col justify-end backdrop-blur-3xl p-6 bg-primary/50">
          <h1 className="text-background font-bold font-display">
            Welcome to DooleyOnline
          </h1>
          <p className="text-muted">
            A one-stop resource for Emory students. Buy, sell, find housing, and
            connect with peers.
          </p>
        </div>
      </header>
    </main>
  );
};

export default Home;
