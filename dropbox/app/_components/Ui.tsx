'use client'

import { useState } from 'react'
import DragDropSection from './DragDropSection'
import ImageSection from './ImageSection'
import Logo from './Logo'
import SearchInput from './SearchInput'

export default function Ui() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="flex flex-col gap-3">
      <Logo />
      <SearchInput setSearchValue={setSearchValue} />
      <DragDropSection />
      <ImageSection searchValue={searchValue} />
    </div>
  )
}
