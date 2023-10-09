interface GameRoundHeaderProps {
  title: string;
  subTitle?: string;
};

export default function GameRoundHeader({ title, subTitle }: GameRoundHeaderProps) {
  return (
    <div className="w-full flex items-center flex-col text-slate-50">
      <div className="w-max">
        <span className="font-bagelfat uppercase text-3xl">
          {title}
        </span>
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