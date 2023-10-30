interface GameRoundHeaderProps {
  title: string;
  subTitle?: string;
};

export default function GameRoundHeader({ title, subTitle }: GameRoundHeaderProps) {
  return (
    <div className="w-full flex items-left flex-col text-eggplant-800 p-3">
      <div className="font-rokkitt font-black text-6xl break-words">
        {title}
      </div>
      {subTitle && (
        <div className="max-w-[450px] text-center m-auto px-2 mt-3 mb-4">
          <span className="font-montserrat font-light">
            {subTitle}
          </span>
        </div>
      )}
    </div>
  )
}