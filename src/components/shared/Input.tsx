import {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  useCallback,
  useRef,
  useState
} from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  initValue?: string;
  regexContrains?: string;
  regexError?: string;
}

export default function Input({
  initValue = '',
  regexContrains = '[sS]*',
  regexError,
  ...props
}: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState(ref.current === document.activeElement);
  const [value, setValue] = useState(initValue);
  const [error, setError] = useState('test err');

  const onFocus = useCallback((event: FocusEvent<HTMLInputElement>) => {
    setFocus(true);
    if (props.onFocus) {
      props.onFocus(event);
    }
  }, []);

  const onBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
    setFocus(false);
    if (props.onBlur) {
      props.onBlur(event);
    }
  }, []);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const regex = new RegExp(regexContrains);

    if (regex.test(value)) {
      setValue(event.target.value);
      return;
    }

    setError(regexError ?? 'Invalid value');
    if (props.onChange) {
      props.onChange(event);
    }
  }, []);

  return (
    <div>
      <div className='relative'>
        <label
          htmlFor={props.name}
          className={`
            absolute block text-sm font-bold leading-6 left-4 -translate-y-1/2
            transition-all duration-300
            ${
              focus || value.length > 0
                ? '-top-3 text-gray-900'
                : 'top-1/2  text-gray-300'
            }
            `}
        >
          {props.placeholder}
        </label>
        <input
          {...props}
          ref={ref}
          className='block w-full rounded-md border-0 py-3 pl-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          placeholder=''
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
        />
      </div>
      <span
        className={`
      animate-pulse text-red-500 font-thin text-xs 
      transition-all duration-300
      ${error.length > 0 ? 'opacity-1' : 'opacity-0'}
      `}
      >
        {error}
      </span>
    </div>
  );
}
