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
    toast.promise(fetch(`http://localhost:5000/${localStorage.getItem("gpttoken")}/paraphrase`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({text: text})
    }), {
        success: (res) => { res.json().then(data => setRes(data.text)); return "Paraphrased!" },
        error: "Failed to paraphrase!",
        loading: "Paraphrasing text..."
    })
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row justify-between items-center">
        <div className="text-4xl font-bold">Text Paraphraser</div>
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
