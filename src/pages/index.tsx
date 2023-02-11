import { type NextPage } from "next";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  const [text, setText] = useState("on Space");

  useEffect(() => {
    const interval = setInterval(() => {
      const localText = ["on Space.", "in your personal cloud.", "in a new web."][
        Math.floor(Math.random() * 2)
      ] as string;
      setText(localText);
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <div className="background-container flex min-h-screen items-center justify-center font-[Raleway] text-white">
      <div className="stars"></div>
      <div className="twinkling"></div>
      <main className="z-[999] flex flex-col items-center justify-center gap-3">
        <Navbar />
        <div className="uppercase text-sm"></div>
        <div className="text-5xl font-bold text-white">
          Explore the Power of GPT
        </div>
        <div className="my-4 w-fit bg-white px-4 py-2 text-5xl font-bold text-transparent">
          <div className="animate-text bg-gradient-to-r from-teal-400 via-blue-600 to-violet-700 bg-clip-text">
            {text}
          </div>
        </div>
        <button className="font-semibold text-lg bg-[#6128fc] px-8 py-1.5 rounded-full hover:bg-[#6128fc]/80 transition ease-in-out duration-300">Get Started</button>
      </main>
    </div>
  );
};

export default Home;
