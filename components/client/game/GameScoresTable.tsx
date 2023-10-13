export default function GameScoresTable({ columnOne, columnTwo, columnThree, color }: { columnOne: string, columnTwo: string, columnThree: string, color?: string }) {
  return (
    <div className={`mt-1 p-4 rounded-lg ${color} ${!color ? 'font-bold pb-2' : ''}`}>
      <div className="flex justify-start items-center">
        <div className="w-2/3 sm:w-1/3 text-left sm:text-center px-2 font-semibold">
          <div>{columnOne}</div>
          {color && (
            <div className="font-light text-xs sm:hidden">
              {!!columnTwo && (
                <span>Guessed: {columnTwo}</span>
              )}
              {!columnTwo && (
                <span>This doofus didn’t guess</span>
              )}
            </div>
          )}
        </div>
        <div className="flex justify-start w-1/3 sm:w-2/3">
          <div className="hidden sm:block w-1/2 text-center px-1">
            {!!columnTwo && (
              <span>{columnTwo}</span>
            )}
            {!columnTwo && (
              <span>This doofus didn’t guess</span>
            )}
          </div>
          <div className="w-full sm:w-1/2 text-right px-1">
            {columnThree}
          </div>
        </div>
      </div>
    </div>
  )
}