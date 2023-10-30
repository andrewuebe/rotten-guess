export default function LobbyTopBar() {
  return (
    <div className="bg-white w-full fixed top-0 border-b-eggplant-800 border-b-2">
      <div className="container py-2 flex items-center">
        <div className="flex-shrink-0">
          <svg className="h-8" viewBox="0 0 31 36" xmlns="http://www.w3.org/2000/svg">
            <ellipse fill="#EE4244" stroke="#2D0223" strokeMiterlimit="10" cx="15.4" cy="21.8" rx="14.5" ry="13.5" />
            <path fill="#6B8E5A" stroke="#2D0223" strokeMiterlimit="10" d="M3.9,11.3c0,2,5,0,6,1s-6,7-2,8s5-7,7-6s2,8,5,7s-1-7,1-9s9,2,9-1
        s-8-1-9-3s4-4,2-6s-4,4.1-6,4s-1-6-4-5s1,6-1,7S3.9,9.3,3.9,11.3z"/>
          </svg>
        </div>

        {/* Centered Text/Header */}
        <div className="text-center flex-grow">
          <h1 className="text-xl font-rokkitt font-bold italic tracking-tighter text-tomato-soup-400">Rotten Guess</h1>
        </div>

        {/* Right-aligned Hamburger Icon */}
        <div className="flex-shrink-0 cursor-pointer">
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
          </svg>
        </div>
      </div>
    </div>
  )
}