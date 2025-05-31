import Image from "next/image";

const NotFoud = () => {
  return (
    <main className="size-full flex flex-col gap-4 items-center justify-center text-xl text-destructive">
      <Image
        src="/logo.svg"
        width={200}
        height={200}
        alt="logo"
      />
      404 NOT FOUND. TRY AGAIN.
    </main>
  );
};

export default NotFoud;
