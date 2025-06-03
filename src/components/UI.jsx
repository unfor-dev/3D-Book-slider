import { atom, useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

const pictures = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9",
  "10", "11", "12", "13", "14", "15", "16", "17", "18",
];

export const pageAtom = atom(0);

export const pages = [
  { front: "book-cover", back: pictures[0] },
];

for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back",
});

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const musicRef = useRef(null);

  useEffect(() => {
    const flipAudio = new Audio("/audios/page-flip-01a.mp3");
    flipAudio.play().catch(() => {
      // silent fail — autoplay block
    });
  }, [page]);

  const handleMusicToggle = () => {
    if (!musicRef.current) {
      musicRef.current = new Audio("/audios/bg-music.mp3");
      musicRef.current.loop = true;
    }

    if (isMusicPlaying) {
      musicRef.current.pause();
    } else {
      musicRef.current.play().catch(() => {
        // silent fail
      });
    }

    setIsMusicPlaying((prev) => !prev);
  };

  return (
    <>
      {/* Header qismi */}
      <main className="pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col">
        <div className="flex justify-between items-center w-full px-10 py-8 pointer-events-auto">
          {/* Logo */}
          <a href="#" className="flex-shrink-0">
            <img className="w-20 rounded-md" src="/images/logo.jpg" alt="Logo" />
          </a>

          {/* Music Toggle Button */}
          <button
            onClick={handleMusicToggle}
            className="transition-all border-2 border-purple-100 text-white px-4 py-1 rounded-md hover:bg-purple-100 hover:text-black text-sm uppercase"
          >
            {isMusicPlaying ? "Pause" : "Play Music"}
          </button>
        </div>

        {/* Sahifa tugmalari */}
        <div className="w-full overflow-auto pointer-events-auto flex justify-center">
          <div className="overflow-auto flex items-center gap-4 max-w-full p-10">
            {pages.map((_, index) => (
              <button
                key={index}
                className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
                  index === page
                    ? "bg-white/90 text-black"
                    : "bg-black/30 text-white"
                }`}
                onClick={() => setPage(index)}
              >
                {index === 0 ? "Cover" : `Page ${index}`}
              </button>
            ))}
            <button
              className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
                page === pages.length
                  ? "bg-white/90 text-black"
                  : "bg-black/30 text-white"
              }`}
              onClick={() => setPage(pages.length)}
            >
              Back Cover
            </button>
          </div>
        </div>
      </main>

      {/* Harakatlanuvchi fon banneri */}
      <div className="fixed inset-0 flex items-center -rotate-2 select-none z-0">
        <div className="relative">
          <div className="bg-white/0 animate-horizontal-scroll flex items-center gap-8 w-max px-8">
            <h1 className="shrink-0 text-white text-10xl font-black ">Unfor Dev</h1>
            <h2 className="shrink-0 text-white text-8xl italic font-light">BMW M5</h2>
            <h2 className="shrink-0 text-white text-12xl font-bold">Unfor Dev</h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">BMW M5</h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">Unfor Dev</h2>
            <h2 className="shrink-0 text-white text-9xl font-extralight italic">BMW M5</h2>
            <h2 className="shrink-0 text-white text-13xl font-bold">BMW M5 F90</h2>
          </div>
          <div className="absolute top-0 left-0 bg-white/0 animate-horizontal-scroll-2 flex items-center gap-8 px-8 w-max">
            <h1 className="shrink-0 text-white text-10xl font-black ">BMW</h1>
            <h2 className="shrink-0 text-white text-8xl italic font-light">Unfor Dev</h2>
            <h2 className="shrink-0 text-white text-12xl font-bold">BMW M5</h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">Unfor Dev</h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">BMW M5</h2>
            <h2 className="shrink-0 text-white text-9xl font-extralight italic">Unfor Dev</h2>
            <h2 className="shrink-0 text-white text-13xl font-bold">BMW M5 F90</h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">BMW</h2>
          </div>
        </div>
      </div>
    </>
  );
};
