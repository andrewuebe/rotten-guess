export default function GameScoresMovieReveal({ title, rt_score, rt_url }: { title: string, rt_score: string, rt_url: string }) {
  return (
    <div className="mt-8 pb-8">

      <div className="w-[250px] h-[250px] mx-auto bg-white rounded-full relative">
        <div className="text-xs absolute -left-6 -top-4 rounded bg-amber-300 w-[180px] p-2">
          % of {' '}
          <span className="text-xs font-bold underline">
            <a href={rt_url} target="_blank" rel="noreferrer">{title}</a>
          </span>
          {' '} reviews that are positive:
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-5xl font-montserrat font-bold text-rose-600">
            {rt_score}%
          </div>
        </div>
      </div>
    </div>
  )
}