import { useLobby } from "@/utilities/hooks/useLobby";
import GameTimer from "../game/GameTimer";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  HamburgerMenuIcon,
  Cross1Icon as CloseIcon,
  DotFilledIcon
} from '@radix-ui/react-icons';
import { useState } from "react";

interface LobbyTopBarProps {
  endDate?: Date;
  onTimeUp?: () => void;
}

export default function LobbyTopBar({ endTime, onTimeUp }: LobbyTopBarProps) {
  const { data, leave } = useLobby();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="bg-white w-full fixed top-0 border-b-eggplant-800 border-b-2 z-50">
      <div className="container py-2 flex items-center">
        <div className="flex-shrink-0">
          {!endTime && (
            <svg className="h-8" viewBox="0 0 31 36" xmlns="http://www.w3.org/2000/svg">
              <ellipse fill="#EE4244" stroke="#2D0223" strokeMiterlimit="10" cx="15.4" cy="21.8" rx="14.5" ry="13.5" />
              <path fill="#6B8E5A" stroke="#2D0223" strokeMiterlimit="10" d="M3.9,11.3c0,2,5,0,6,1s-6,7-2,8s5-7,7-6s2,8,5,7s-1-7,1-9s9,2,9-1
        s-8-1-9-3s4-4,2-6s-4,4.1-6,4s-1-6-4-5s1,6-1,7S3.9,9.3,3.9,11.3z"/>
            </svg>
          )}
          {endTime && (
            <GameTimer
              date={endTime}
              onTimeUp={onTimeUp as () => void}
            />
          )}
        </div>

        {/* Centered Text/Header */}
        <div className="text-center flex-grow">
          <h1 className="text-xl font-rokkitt font-bold italic tracking-tighter text-tomato-soup-400">Rotten Guess</h1>
        </div>

        {/* Right-aligned Hamburger Icon */}
        <div>
          {!data && (
            <div className="text-white">
              <DotFilledIcon />
            </div>
          )}
          {data && (
            <DropdownMenu.Root modal={false} onOpenChange={setIsDropdownOpen}>
              <DropdownMenu.Trigger asChild>
                <button className="flex-shrink-0 cursor-pointer">
                  {isDropdownOpen ? <CloseIcon /> : <HamburgerMenuIcon />}
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className="p-1 mt-[20px] ml-3 bg-white border-black border-2">
                  <DropdownMenu.Item>
                    <button
                      type="button"
                      onClick={() => leave()}
                      className="p-3 rounded-none appearance-none hover:bg-eggplant-50 hover:border-none hover:outline-none"
                    >
                      Leave Lobby
                    </button>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          )}
        </div>
      </div>
    </div>
  )
}