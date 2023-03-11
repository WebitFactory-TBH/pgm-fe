import { InputHTMLAttributes, useCallback, useRef, useState } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ ...props }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState(ref.current === document.activeElement);

  const onFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const onBlur = useCallback(() => {
    setFocus(false);
  }, []);

  return (
    <div className='relative'>
      <label
        htmlFor={props.name}
        className={`
          absolute block text-sm font-bold leading-6 left-4 -translate-y-1/2
          transition-all duration-300
          ${focus ? '-top-3 text-gray-900' : 'top-1/2  text-gray-300'}
          `}
      >
        {props.placeholder}
      </label>
      <input
        {...props}
        ref={ref}
        className='block w-full rounded-md border-0 py-3 pl-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        placeholder=''
        onFocus={onFocus}
        onBlur={onBlur}
        value={ref.current?.value}
      />
    </div>
  );
}
