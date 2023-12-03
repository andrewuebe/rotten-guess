export default function GameScoresMovieReveal({ title, rt_score, rt_url }: { title: string, rt_score: string, rt_url: string }) {
  return (
    <div className="mt-8 pb-8">

      <div className="w-[250px] h-[250px] mx-auto bg-tomato-soup-500 text-white rounded-full relative">
        <div className="text-xs absolute -left-6 -top-4 rounded bg-vine-500 w-[180px] p-2">
          % of {' '}
          <span className="text-xs font-bold underline">
            <a href={rt_url} target="_blank" rel="noreferrer">{title}</a>
          </span>
          {' '} reviews that are positive:
        </div>
        <div className="w-full h-full flex items-center justify-center flex-col">
          <div className="text-5xl font-montserrat font-bold text-white">
            {rt_score}%
          </div>
          <div className="-mt-4 text-xs">On the tomato meter</div>
        </div>
      </div>
    </div>
  )
}