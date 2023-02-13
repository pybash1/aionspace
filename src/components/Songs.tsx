import { useState } from "react";
import toast from "react-hot-toast";

const Songs = () => {
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const [res, setRes] = useState("");

  const generate = () => {
    if (!song || !artist) {
        toast.error("Song and artist are required!");
        return;
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    toast.promise(fetch(`/api/${localStorage.getItem("gpttoken") as string}/generate/songs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({song: song, artist: artist})
    }), {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        success: (res) => { res.json().then((data: { text: string; }) => setRes(data.text)); return "Recommended songs!" },
        error: "Failed to find recommendations!",
        loading: "Finding recommendations..."
    })
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row justify-between items-center">
        <div className="text-4xl font-bold">Song Recommender</div>
        <button className="rounded-full px-3 py-1.5 bg-[#6128fc]" onClick={generate}>Recommend</button>
      </div>
      <div className="grid w-[70vw] grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
            <label className="font-medium">Song Name</label>
            <input
                value={song}
                placeholder="Song name"
                onChange={(e) => setSong(e.target.value)}
                className="w-full rounded-md bg-gray-300 px-3 py-2 font-medium text-black outline-none"
            />
        </div>
        <div className="flex flex-col gap-2">
            <label className="font-medium">Song Artist</label>
            <input
                value={artist}
                placeholder="Artist name"
                onChange={(e) => setArtist(e.target.value)}
                className="w-full rounded-md bg-gray-300 px-3 py-2 font-medium text-black outline-none"
            />
        </div>
      </div>
    <div className="h-full w-full min-h-[55vh] rounded-md bg-gray-300 px-3 py-2 font-medium text-black outline-none">{res}</div>
    </div>
  );
};

export default Songs;
