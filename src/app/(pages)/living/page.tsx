import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Living @ dooleyonline",
  description: "Find your home away from home.",
};

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center h-full">
      <h2 className="font-display">Coming Soon!</h2>
      <p className="text-muted-foreground">
        We&apos;re working on some exciting new features. Stay tuned for
        updates!
      </p>
    </main>
  );
}
