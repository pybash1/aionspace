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
    toast.promise(fetch(`http://localhost:5000/${localStorage.getItem("gpttoken")}/summarise`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({text: text})
    }), {
        success: (res) => { res.json().then(data => setRes(data.text)); return "Summarised!" },
        error: "Failed to summarise!",
        loading: "Summarising text..."
    })
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row justify-between items-center">
        <div className="text-4xl font-bold">Text Summariser</div>
        <button className="rounded-full px-3 py-1.5 bg-[#6128fc]" onClick={summarise}>Summarise</button>
      </div>
      <div className="grid h-[65vh] w-[70vw] grid-cols-2 gap-6">
        <textarea className="h-full w-full resize-none rounded-md bg-gray-300 px-3 py-2 font-medium text-black outline-none" placeholder="Enter text to summarise" value={text} onChange={(e) => setText(e.target.value)}></textarea>
        <div className="h-full w-full rounded-md bg-gray-300 px-3 py-2 font-medium text-black outline-none">{res}</div>
      </div>
    </div>
  );
};

export default Summariser;
