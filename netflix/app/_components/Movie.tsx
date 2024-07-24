import Link from "next/link";

export default function Movie({ movie }) {
  return (
    <Link href={`/movies/detail/${movie.id}`}>
      <div className="relative col-span-1 cursor-pointer">
        <img src={movie.image_url} alt={movie.title} />
        <div className="absolute z-10 top-0 left-0 bottom-0 right-0 bg-black opacity-0 hover:opacity-80 transition-opacity duration-300 flex justify-center items-center">
          <p className="text-white font-bold text-xl md:text-3xl truncate px-8">
            {movie.title}
          </p>
        </div>
      </div>
    </Link>
  );
}
