import Link from "next/link";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[999] flex flex-row items-center justify-between px-10 py-8 font-[Raleway] text-white backdrop-blur-md">
      <div className="animate-text bg-gradient-to-r from-teal-400 via-blue-600 to-yellow-500 bg-clip-text text-xl font-bold text-transparent">
        GPT on Space
      </div>
      <div className="flex flex-row gap-6">
        <div>Summariser</div>
        <div>Paraphraser</div>
        <div>Idea Generator</div>
        <div>Content Writer</div>
        <div>Song Recommender</div>
      </div>
      <button className="bg-[#6128fc] px-8 py-1.5 rounded-full hover:bg-[#6128fc]/80 transition ease-in-out duration-300">Configure</button>
    </div>
  );
};

export default Navbar;
