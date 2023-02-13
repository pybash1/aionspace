import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Summariser from "../components/Summariser";
import Paraphraser from "../components/Paraphraser";
import IdeaGen from "../components/IdeaGen";
import Content from "../components/Content";
import Songs from "../components/Songs";

const Home: NextPage = () => {
  const [main, setMain] = useState(<Summariser />);

  const router = useRouter();

  useEffect(() => {
    fetch("/api/gettoken")
      .then((res) =>
        res
          .json()
          .then((data: { token: string }) => {
            if (!data.token) {
              void router.push("/configure");
              toast.error("Please configure AI on Space first!");
            }
          })
          .catch((e) => console.log(e))
      )
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="background-container flex min-h-screen font-[Raleway] text-white">
      <div className="stars"></div>
      <div className="twinkling"></div>
      <Navbar />
      <main className="z-[999] mt-[100px] flex flex-row">
        <aside className="flex h-full flex-col items-start gap-16 px-14 py-10 text-white">
          <button
            className="transition duration-300 ease-in-out hover:text-gray-300"
            onClick={() => setMain(<Summariser />)}
          >
            Summariser
          </button>
          <button
            className="transition duration-300 ease-in-out hover:text-gray-300"
            onClick={() => setMain(<Paraphraser />)}
          >
            Paraphraser
          </button>
          <button
            className="transition duration-300 ease-in-out hover:text-gray-300"
            onClick={() => setMain(<IdeaGen />)}
          >
            Idea Generator
          </button>
          <button
            className="transition duration-300 ease-in-out hover:text-gray-300"
            onClick={() => setMain(<Content />)}
          >
            Content Wrier
          </button>
          <button
            className="transition duration-300 ease-in-out hover:text-gray-300"
            onClick={() => setMain(<Songs />)}
          >
            Song Recommender
          </button>
        </aside>
        <div className="px-14 py-10 text-white">{main}</div>
      </main>
    </div>
  );
};

export default Home;
