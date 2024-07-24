import Ui from './_components/Ui'

export default function MovieDetail({ params }) {
  return (
    <div className="mt-14">
      <Ui id={params.id} />
    </div>
  )
}
