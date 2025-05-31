import banner from "@/../public/images/banner.png";
import Image from "next/image";

const Home = () => {
  return (
    <main>
      <header className="w-full h-[30svh] max-h-[500px] bg-muted rounded-xl overflow-hidden relative">
        <Image
          src={banner}
          alt="Site banner"
          fill
          placeholder="blur"
          className="object-cover z-0 brightness-50"
        />
        <div className="absolute bottom-6 left-6">
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
