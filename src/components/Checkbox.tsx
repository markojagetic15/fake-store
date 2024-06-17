import * as CheckboxItem from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

interface IProps {
  label?: string
  checked: boolean
  onClick: (event: React.MouseEvent) => void
  className?: string
}

export const Checkbox = (props: IProps) => {
  return (
    <div className='flex items-center'>
      <CheckboxItem.Root
        checked={props.checked}
        onClick={props.onClick}
        className={`hover:bg-midnight flex h-[18px] w-[18px] appearance-none items-center justify-center rounded-[4px] bg-white border outline-none focus:shadow-[0_0_0_2px_black] ${props.className}`}
      >
        <CheckboxItem.Indicator className='text-black'>
          <CheckIcon />
        </CheckboxItem.Indicator>
      </CheckboxItem.Root>
      <label className='pl-[15px] text-[15px] leading-none text-white' htmlFor='c1'>
        {props.label}
      </label>
    </div>
  )
}
