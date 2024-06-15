import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

interface IProps {
  trigger: React.ReactNode
  children: React.ReactNode
}

export const Dropdown = (props: IProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{props.trigger}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className='min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade'
          sideOffset={5}
        >
          {props.children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
