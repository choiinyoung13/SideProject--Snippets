"use client";

import { useSetRecoilState } from "recoil";
import Logo from "./Logo";
import { searchState } from "app/_recoil/searchValue";

export default function Header() {
  const setSearchValue = useSetRecoilState(searchState);

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-gray-900 flex items-center px-4 py-2 justify-between">
      <nav className="flex gap-4">
        <Logo />
        <ul className="text-white text-l flex items-center gap-4">
          <li>Movies</li>
          <li>Dramas</li>
        </ul>
      </nav>

      <div className="flex items-center gap-1 border border-white px-3 rounded-md">
        <i className="fas fa-search text-white" />
        <input
          type="text"
          className="bg-transparent text-white p-2 outline-none max-w-50"
          placeholder="Search Movies"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
      </div>
    </header>
  );
}
