interface IProps {
  placeholder?: string
  value?: string | number
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  width?: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  type?: string
}

export const Input = (props: IProps) => {
  return (
    <div
      className={`flex gap-2 text-black box-border ${props.width ? `w-${props.width}` : 'w-full'} bg-white shadow-black inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6`}
    >
      {props.startIcon}

      <input
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className='outline-0'
        type={props.type}
      />

      {props.endIcon}
    </div>
  )
}
