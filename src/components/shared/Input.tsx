import {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  useCallback,
  useRef,
  useState
} from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  regexContrains?: string;
  regexError?: string;
}

export default function Input({
  regexContrains = '[sS]*',
  regexError,
  disabled = false,
  ...props
}: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState(ref.current === document.activeElement);
  const [value, setValue] = useState(props.defaultValue);
  const [error, setError] = useState('');

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
    setError('');
    const { value } = event.target;

    const regex = new RegExp(regexContrains);

    if (!regex.test(value)) {
      setError(regexError ?? 'Invalid value');
      return;
    }

    setValue(event.target.value);
    if (props.onChange) {
      props.onChange(event);
    }
  }, []);

  return (
    <div
      className={`w-full relative pb-4 ${
        disabled ? 'opacity-40' : 'opacity-100'
      }`}
      onClick={() => {
        ref.current?.focus();
      }}
    >
      <div className='relative'>
        <label
          htmlFor={props.name}
          className={`
            absolute block text-sm font-medium leading-6 left-4 -translate-y-1/2
            transition-all duration-300 cursor-text
            ${
              focus || typeof value === 'number' || value?.toString()
                ? 'top-4 text-gray-900'
                : 'top-1/2  text-gray-300'
            }
            `}
        >
          {props.placeholder}
        </label>
        <input
          {...props}
          ref={ref}
          className='block w-full rounded-md border-0 pb-2 pt-6 pl-4 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          placeholder=''
          defaultValue={undefined}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      <span
        className={`
      text-red-500 font-thin text-xs absolute -bottom-0
      transition-all duration-300 cursor-default left-4
      ${error.length > 0 ? 'opacity-1' : 'opacity-0'}
      `}
      >
        {error}
      </span>
    </div>
  );
}
