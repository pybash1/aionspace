import { useState } from "react";
import toast from "react-hot-toast";

const Paraphraser = () => {
  const [text, setText] = useState("");
  const [res, setRes] = useState("");

  const paraphrase = async () => {
    if (!text) {
      toast.error("Text is required!");
      return;
    }
    const tid = toast.loading("Paraphrasing text...");

    const res = await fetch(`/api/paraphrase`, {
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
        toast.error("Failed to paraphrase!", {
          id: tid
        })
      }
    } else {
      setRes(data.text as string)
      toast.success("Paraphrased text!", {
        id: tid
      })
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row justify-between items-center">
        <div className="text-4xl font-bold">Text Paraphraser</div>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <button className="rounded-full px-3 py-1.5 bg-[#6128fc]" onClick={paraphrase}>Paraphrase</button>
      </div>
      <div className="grid h-[65vh] w-[70vw] grid-cols-2 gap-6">
        <textarea className="h-full w-full resize-none rounded-md bg-gray-300 px-3 py-2 font-medium text-black outline-none" placeholder="Enter text to paraphrase" value={text} onChange={(e) => setText(e.target.value)}></textarea>
        <div className="h-full w-full rounded-md bg-gray-300 px-3 py-2 font-medium text-black outline-none">{res}</div>
      </div>
    </div>
  );
};

export default Paraphraser;
