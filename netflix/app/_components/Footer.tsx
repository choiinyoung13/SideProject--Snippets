import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 font-bold text-md bg-gray-900 flex justify-center items-center gap-1 py-2">
      <p className="text-white">Movie Database from</p>
      <Link
        className="text-blue-700"
        href={"https://www.themoviedb.org/?language=ko-KR"}
      >
        {" "}
        TMDB
      </Link>
    </footer>
  );
}
