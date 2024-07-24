import Ui from "./_components/Ui";

export default function MovieDetail({ params }) {
  return (
    <div>
      <Ui id={params.id} />
    </div>
  );
}
