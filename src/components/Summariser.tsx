import { useState } from "react";
import toast from "react-hot-toast";

const Summariser = () => {
  const [text, setText] = useState("");
  const [res, setRes] = useState("");

  const summarise = async () => {
    if (!text) {
      toast.error("Text is required!");
      return;
    }
    const tid = toast.loading("Summarising text...");

    const res = await fetch(`/api/summarise`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: { error?: string; text?: string } = await res.json();
    if (data.error) {
      if (data.error === "token not found") {
        toast.error("Please configure AI on Space first!", {
          id: tid
        })
      } else if (data.error === "exceeded quota") {
        toast.error("You're out of credits!", {
          id: tid
        })
      } else if (data.error === "invalid token") {
        toast.error("Invalid OpenAI API key provided!", {
          id: tid
        })
      } else {
        toast.error("Failed to summarize!", {
          id: tid
        })
      }
    } else {
      setRes(data.text as string)
      toast.success("Summarized text!", {
        id: tid
      })
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between">
        <div className="text-4xl font-bold">Text Summariser</div>
        <button
          className="rounded-full bg-[#6128fc] px-3 py-1.5"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={summarise}
        >
          Summarise
        </button>
      </div>
      <div className="grid h-[65vh] w-[70vw] grid-cols-2 gap-6">
        <textarea
          className="h-full w-full resize-none rounded-md bg-gray-300 px-3 py-2 font-medium text-black outline-none"
          placeholder="Enter text to summarise"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div className="h-full w-full rounded-md bg-gray-300 px-3 py-2 font-medium text-black outline-none">
          {res}
        </div>
      </div>
    </div>
  );
};

export default Summariser;
