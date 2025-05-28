import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export default function Home() {
  const trending = [
    {
      id: 1,
      title: "Selling Macbook Air M1",
      subtitle: "$400 · Near Harris Hall",
    },
    {
      id: 2,
      title: "Looking for Private Roommate",
      subtitle: "Emory Point · Move-in July",
    },
    {
      id: 3,
      title: "Study Tips for CS 334 Exam",
      subtitle: "Popular Community Post · 89 Likes",
    },
  ];

  const features = [
    {
      id: 1,
      title: "DooleyBay",
      description: "Trusted deals on books, electronics, and dorm essentials",
      icon: "📦",
      url: "/marketplace",
    },
    {
      id: 2,
      title: "Rent/Roommate",
      description:
        "Find your new house or roommates who fit your lifestyle and preferences",
      icon: "🏠",
      url: "/living",
    },
    {
      id: 3,
      title: "Student Community",
      description:
        "Share campus info, seek advice, and explore clubs in a vibrant community",
      icon: "💬",
      url: "/forum",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 sm:py-24 md:py-32 lg:py-40 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">
          Everything students need &mdash; marketplace, roommates, and
          community!
        </h1>
      </section>
      {/* Features Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Link
              key={feature.id}
              href={`${feature.url}`}
              className="w-full sm:w-80 md:w-96 lg:w-[28rem] mx-auto"
            >
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader className="space-y-2 text-center">
                  <div className="text-4xl">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="container mx-auto px-6 py-20 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-12">🔥 Trending Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trending.map((item) => (
            <Link
              key={item.id}
              href={`/marketplace`}
              className="w-full max-w-md mx-auto"
            >
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.subtitle}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t pt-6 pb-4">
        <div className="container mx-auto px-6 flex flex-row flex-nowrap items-center justify-center space-x-4 text-xs md:text-sm text-gray-500 whitespace-nowrap">
          <p>© 2025 DooleyOnline. All rights reserved.</p>
          <p> | </p>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <p> | </p>
          <a href="#" className="hover:underline">
            Terms of Use
          </a>
          <p> | </p>
          <a href="#" className="hover:underline">
            Contact Us
          </a>
        </div>
      </footer>
    </main>
  );
}
