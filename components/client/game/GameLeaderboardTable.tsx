export default function GameScoresTable({ columnOne, columnTwo, color }: { columnOne: string, columnTwo: string, color?: string }) {
  return (
    <div className={`mt-1 p-4 rounded-lg ${color} ${!color ? 'font-bold pb-2' : ''}`}>
      <div className="flex justify-start items-center">
        <div className="w-2/3 text-left px-2 font-semibold">
          <div>{columnOne}</div>
        </div>
        <div className="flex justify-start w-1/3 ">
          <div className="w-full text-right px-1">
            {columnTwo}
          </div>
        </div>
      </div>
    </div>
  )
}