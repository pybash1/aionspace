import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { env } from "../env.mjs";

const Home: NextPage = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("gpttoken")) {
      setToken(localStorage.getItem("gpttoken") as string);
    }
  }, []);

  const handleSave = async () => {
    const res = await fetch(`/api/settoken`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: token
      })
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json: { error: string; } = await res.json();
    if (json.error) {
      toast.error("Failed to update!")
    } else {
      toast.success("Updated successfully!")
    }
  }

  return (
    <div className="background-container flex min-h-screen font-[Raleway] text-white">
      <div className="stars"></div>
      <div className="twinkling"></div>
      <main className="z-[999] flex flex-col gap-4 px-56 py-48">
        <Navbar />
        <div className="text-3xl text-white">Configure AI on Space</div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">OpenAI API Key</label>
          <div className="flex flex-row gap-6">
            <input
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full rounded-md bg-gray-300 px-3 py-2 font-medium text-black outline-none"
            />
            <button className="rounded-full px-3 py-1.5 bg-[#6128fc]" onClick={() => handleSave}>Update</button>
          </div>
        </div>
        <div className="pt-6">
          <div>How to find my GPT API key?</div>
          <div className="text-gray-300">
            To find or generate a new API key for GPT, go to this URL,{" "}
            <Link
              className="underline underline-offset-2"
              href="https://platform.openai.com/account/api-keys"
            >
              https://platform.openai.com/account/api-keys
            </Link>
            , then click on &quot;Create new secret key&quot; and copy the new
            generated API key.
          </div>
        </div>
        <div className="pt-2">
          <div>Is this safe?</div>
          <div className="text-gray-300">
            Yes, this is 100% safe as this token is stored only on your browser
            and that too in your own personal deta cloud and if you are still
            afraid you can view the source code for this site on GitHub.
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
