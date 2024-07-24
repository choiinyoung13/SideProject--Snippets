import { Input } from '@material-tailwind/react'

export default function SearchInput({ setSearchValue }) {
  return (
    <div>
      <Input
        label="Search Drop Item"
        icon={<i className="fas fa-search" />}
        onChange={e => {
          setSearchValue(e.target.value)
        }}
      />
    </div>
  )
}
