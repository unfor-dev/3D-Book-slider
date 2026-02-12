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
  const flipAudioRef = useRef(null);

  // Audio memory leak tuzatildi — bitta Audio object qayta ishlatiladi
  useEffect(() => {
    if (page === 0 && !flipAudioRef.current) return; // Birinchi renderda ovoz chiqarmaslik
    if (!flipAudioRef.current) {
      flipAudioRef.current = new Audio("/audios/page-flip-01a.mp3");
    }
    flipAudioRef.current.currentTime = 0;
    flipAudioRef.current.play().catch(() => {
      // silent fail — autoplay block
    });
  }, [page]);

  // Komponent unmount bo'lganda audiolarni tozalash
  useEffect(() => {
    return () => {
      if (flipAudioRef.current) {
        flipAudioRef.current.pause();
        flipAudioRef.current = null;
      }
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current = null;
      }
    };
  }, []);

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
      {/* Navigation */}
      <nav className="pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col">
        <header className="flex justify-between items-center w-full px-10 py-8 pointer-events-auto">
          {/* Logo */}
          <a href="/" className="flex-shrink-0" aria-label="Home page">
            <img className="w-20 rounded-md" src="/images/logo.jpg" alt="BMW M5 F90 3D Book Slider" />
          </a>

          {/* Music Toggle Button */}
          <button
            onClick={handleMusicToggle}
            aria-label={isMusicPlaying ? "Pause background music" : "Play background music"}
            className="transition-all border-2 border-purple-100 text-white px-4 py-1 rounded-md hover:bg-purple-100 hover:text-black text-sm uppercase"
          >
            {isMusicPlaying ? "Pause" : "Play Music"}
          </button>
        </header>

        {/* Sahifa tugmalari */}
        <div className="w-full overflow-auto pointer-events-auto flex justify-center" role="navigation" aria-label="Book pages">
          <div className="overflow-auto flex items-center gap-4 max-w-full p-10">
            {pages.map((_, index) => (
              <button
                key={index}
                aria-current={index === page ? "page" : undefined}
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
              aria-current={page === pages.length ? "page" : undefined}
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
      </nav>

      {/* Harakatlanuvchi fon banneri */}
      <div className="fixed inset-0 flex items-center -rotate-2 select-none z-0" aria-hidden="true">
        <div className="relative">
          <div className="bg-white/0 animate-horizontal-scroll flex items-center gap-8 w-max px-8">
            <span className="shrink-0 text-white text-10xl font-black">Unfor Dev</span>
            <span className="shrink-0 text-white text-8xl italic font-light">BMW M5</span>
            <span className="shrink-0 text-white text-12xl font-bold">Unfor Dev</span>
            <span className="shrink-0 text-transparent text-12xl font-bold italic outline-text">BMW M5</span>
            <span className="shrink-0 text-white text-9xl font-medium">Unfor Dev</span>
            <span className="shrink-0 text-white text-9xl font-extralight italic">BMW M5</span>
            <span className="shrink-0 text-white text-13xl font-bold">BMW M5 F90</span>
          </div>
          <div className="absolute top-0 left-0 bg-white/0 animate-horizontal-scroll-2 flex items-center gap-8 px-8 w-max">
            <span className="shrink-0 text-white text-10xl font-black">BMW</span>
            <span className="shrink-0 text-white text-8xl italic font-light">Unfor Dev</span>
            <span className="shrink-0 text-white text-12xl font-bold">BMW M5</span>
            <span className="shrink-0 text-transparent text-12xl font-bold italic outline-text">Unfor Dev</span>
            <span className="shrink-0 text-white text-9xl font-medium">BMW M5</span>
            <span className="shrink-0 text-white text-9xl font-extralight italic">BMW M5</span>
            <span className="shrink-0 text-white text-13xl font-bold">BMW M5 F90</span>
            <span className="shrink-0 text-transparent text-13xl font-bold outline-text italic">BMW</span>
          </div>
        </div>
      </div>
    </>
  );
};
