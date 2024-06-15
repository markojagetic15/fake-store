import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

interface IProps {
  children: React.ReactNode
  onSelect?: () => void
  selected?: boolean
}

export const DropdownItem = (props: IProps) => {
  return (
    <DropdownMenu.Item
      onSelect={(event) => {
        event.preventDefault()
        if (props.onSelect) {
          props.onSelect()
        }
      }}
      className={`cursor-pointer p-4 group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-midnight data-[highlighted]:text-white ${props.selected ? 'bg-midnight text-white' : ''}`}
    >
      {props.children}
    </DropdownMenu.Item>
  )
}
