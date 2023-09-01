interface GameRoundTitleProps {
  title: string;
};

export default function GameRoundTitle({ title }: GameRoundTitleProps) {
  return (
    <div className="w-full flex justify-center text-slate-50">
      <div className="w-max">
        <span className="font-bagelfat uppercase text-3xl">
          {title}
        </span>
      </div>
    </div>
  )
}