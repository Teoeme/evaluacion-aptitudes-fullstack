import { Icons } from "prometeo-design-system";
import { type HTMLProps } from "react";

type CheckBoxProps = {
  className?: string;
  disabled?: boolean;
} & HTMLProps<HTMLInputElement>;

const CheckBox = ({ className, disabled, ...rest }: CheckBoxProps) => {
  const boxHoverClassNames = `
    after:content-["<span id='hover-span'></span>"]
    after:absolute
    after:top-1/2
    after:left-1/2
    after:-translate-x-1/2
    after:-translate-y-1/2
    after:w-[40px]
    after:h-[40px]
    after:rounded-full
    after:bg-neutral-700
    after:-z-10
    after:opacity-0
    ${!disabled && "hover:after:opacity-80"}
    after:transition-all
    after:duration-200
    after:ease-in-out
    after:pointer-events-none
    ${!disabled && "aria-checked:hover:bg-primary-default-hover hover:border-primary-default-hover"}
    transition-all
    duration-200
    ease-in-out
    `;

  const inputHoverClass = `
        hover:#hover-span:opacity-30
    `;

const inputPressedClass = `
    focus:#hover-span:bg-red-300
`

const boxCheckedClass = `
    aria-checked:bg-primary-default-default
`
const boxUncheckedClass = `
    bg-transparent
    border-[2px]
    aria-checked:border-none
    border-neutral-medium-default
    hover:border-neutral-medium-hover
`
const boxDisabledClass = `
    bg-primary-default-disabled
    border-neutral-medium-disabled
`
  return (
    <div
      id="checkbox-container"
      style={{
        width: "24px",
        height: "24px",
        position: "relative",
        zIndex: 20,
      }}
      className="grid place-items-center p-2"
    >
      <div
      id="checkbox-box"
        aria-checked={rest.checked}
        className={`grid place-items-center absolute size-[18px] rounded-[2px] 
        ${disabled ? boxDisabledClass : ""}
        ${boxHoverClassNames} 
        ${boxUncheckedClass}
        ${boxCheckedClass}
        `}
        >
        <input
          type="checkbox"
          className={`${className} ${inputHoverClass} ${inputPressedClass}`}
          disabled={disabled}
          style={{
            position: "absolute",
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            cursor: disabled ? "default" : "pointer",
            width: "100%",
            height: "100%",
            opacity: 0,
            zIndex: 150,
          }}
          {...rest}
        />
        {rest.checked && (
          <Icons.Check
            size={18}
            className={`absolute ${disabled ? "opacity-30" : ""} pointer-events-none`}
          />
        )}
      </div>
    </div>
  );
};

export default CheckBox;
