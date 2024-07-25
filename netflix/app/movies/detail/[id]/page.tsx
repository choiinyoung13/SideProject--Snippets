import { getMoviesById } from "app/_actions/movieActions";
import Ui from "./_components/Ui";

export async function generateMetadata({ params }) {
  console.log("Params:", params);

  const res = await getMoviesById(parseInt(params.id, 10));
  const movie = res[0];

  console.log("Movie:", movie);

  return {
    title: movie.title,
    description: movie.overview,
    openGraph: {
      image: [movie.image_url],
    },
  };
}

export default function MovieDetail({ params }) {
  return (
    <div className="mt-14">
      <Ui id={params.id} />
    </div>
  );
}
