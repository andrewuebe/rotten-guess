import { getOverviewExcerpt } from "@/utilities/helpers/movieHelper";
import Button from "../buttons/Button";
import RatingTag from "./RatingTag";

interface MovieDetailsProps {
  selectedMovie: any;
  primaryButton?: (movie: any) => void;
  closeButton: () => void;
}

export default function MovieDetails({ selectedMovie, primaryButton, closeButton }: MovieDetailsProps) {
  return (
    <div className="pb-4">
      <div
        className="w-full h-52 bg-cover bg-top mb-2 rounded-t-md"
        style={{
          backgroundImage: `url(${selectedMovie?.backdropUrl})`,
        }}
      >
      </div>
      <div className="px-3">
        <h2 className="text-2xl font-bold">{selectedMovie.title} <span className="font-light">({selectedMovie.year})</span></h2>
        <div className="mt-1 flex justify-start items-center">
          <RatingTag rating={selectedMovie.rating} />
          {selectedMovie.genre.map((genre: string, index: number) => (
            <span key={`${genre}-${index + 1}`} className={(index < selectedMovie.genre.length - 1) ? 'mr-1' : ''}>
              {genre}
              {index < selectedMovie.genre.length - 1 && ','}
            </span>
          ))}
        </div>
        {
          selectedMovie.overview && (
            <div className="mt-4">
              {getOverviewExcerpt(selectedMovie.overview)}
            </div>
          )
        }
        <div className="mt-4 flex justify-start">
          {!!primaryButton && (
            <Button
              onClick={() => primaryButton(selectedMovie)}
            >
              Pick this movie
            </Button>
          )}
          <Button
            onClick={() => closeButton()}
            className="ml-2 px-4"
            color="secondary"
            size="small"
          >
            x
          </Button>
        </div>
      </div>
    </div>
  )
}