
const genres = [
  { id: "classic", label: "Classic", imgSrc: "/HomePage/classic.jpeg" },
  { id: "fairyTale", label: "Fairy Tale", imgSrc: "/HomePage/fairyTale.jpeg" },
  { id: "sciFi", label: "Science Fiction", imgSrc: "/HomePage/sciFi.jpeg" },
 
];
export default function GenreOverlay({ isVisible, onClose, onSelect,selectedGenre ,setSelectedGenre}) {
  

  return (
    <div
      className={`${
        isVisible ? "block" : "hidden"
      } bg-white relative top-5 z-20 px-4 py-2 border border-gray-300 shadow-lg rounded-lg float`}
      onClick={() => onClose()}
    >
      <p className="font-bold mt-2 text-lg">Writing Style</p>
      <div className="mt-4 grid grid-rows-2 grid-cols-4 overflow-x-scroll gap-3">
        {genres.map((genre) => (
          <div
            key={genre.id}
            className="relative flex-none"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedGenre(genre.id);
              onSelect(genre.id);
            }}
          >
            <label
              className={`border-2 rounded-lg inline-flex items-center relative justify-center text-sm font-medium uppercase ${
                selectedGenre === genre.id ? "border-zinc-600" : "border-none opacity-50 hover:opacity-60"
              } cursor-pointer focus:outline-none`}
            >
              <input
                className="sr-only"
                type="radio"
                name="genre"
                value={genre.id}
                checked={selectedGenre === genre.id}
                readOnly
              />
              <img src={genre.imgSrc} alt={genre.label} className="rounded-md object-fill h-24 w-24 md:w-48 md:h-48" />
              
            </label>
            <p className="mt-2 text-xs">{genre.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
