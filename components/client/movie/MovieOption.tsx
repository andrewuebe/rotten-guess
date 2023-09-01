import RatingTag from "./RatingTag"

export default function MovieOption({ movie, handleMovieOptionClick }: { movie: any, handleMovieOptionClick?: (movie: any) => void }) {
  return (
    <div
      key={`${movie.title}-${movie.year}`}
      className="border-b-2 border-slate-300 last-of-type:border-b-0"
    >
      <div
        className={`m-2 p-2 bg-slate-100 ${handleMovieOptionClick ? 'hover:bg-slate-200 cursor-pointer rounded-md' : ''}`}
        onClick={() => {
          if (handleMovieOptionClick) {
            handleMovieOptionClick(movie)
          }
        }}
      >
        <h3 className="font-bold">{movie.title} <span className="font-light">({movie.year})</span></h3>
        <div className="text-sm">
          <RatingTag rating={movie.rating} />
          {movie.genre.map((genre: string, index: number) => (
            <span key={`${genre}-${index + 1}`} className={(index < movie.genre.length - 1) ? 'mr-1' : ''}>
              {genre}
              {index < movie.genre.length - 1 && ','}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}