import { useState } from "react";
import TextInput from "@/components/client/inputs/TextInput"
import Button from "../buttons/Button";

interface ScorePickerProps {
  onScoreSelect: (score: number) => void;
}

export default function ScorePicker({ onScoreSelect }: ScorePickerProps) {
  const [score, setScore] = useState<number>(0)
  return (
    <div>
      <TextInput
        value={score.toString()}
        onChange={(e) => setScore(parseInt(e))}
        placeholder="50"
        type="number"
      />
      <div className="mt-4">
        <Button
          color="vine"
          size="large"
          onClick={() => onScoreSelect(score)}
        >
          Submit guess
        </Button>
      </div>
    </div>
  )
}