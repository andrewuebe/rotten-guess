export default function GameScoresTable({ columnOne, columnTwo, columnThree, color }: { columnOne: string, columnTwo: string, columnThree: string, color?: string }) {
  return (
    <div className={`mt-1 p-4 rounded-lg ${color} ${!color ? 'font-bold pb-2' : ''}`}>
      <div className="flex justify-start">
        <div className="w-1/3 text-center px-2">
          {columnOne}
        </div>
        <div className="flex justify-start w-2/3">
          <div className="w-1/2 text-center px-1">
            {columnTwo}
          </div>
          <div className="w-1/2 text-center px-1">
            {columnThree}
          </div>
        </div>
      </div>
    </div>
  )
}