import Image from "next/image";

const NotFound = () => {
  return (
    <main className="size-full flex flex-col gap-4 items-center justify-center text-xl text-destructive">
      <Image src="/logo.svg" width={200} height={200} alt="logo" />
      <p className="font-semibold">404 NOT FOUND. TRY AGAIN.</p>
    </main>
  );
};

export default NotFound;
