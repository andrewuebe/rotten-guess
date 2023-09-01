export default function RatingTag({ rating }: { rating: string }) {
  return (
    <div className="rounded-md border border-black px-1 py-[0.9px] w-max mr-2 inline-block text-xs">
      {rating}
    </div>
  )
}