import { InputHTMLAttributes } from 'react';

export default function Checkbox({
  type = 'checkbox',
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className='flex items-center mr-4'>
      <input
        {...props}
        id='inline-checkbox'
        type={type}
        value={props.value}
        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
        placeholder=''
        onChange={props.onChange}
      />
      <label
        htmlFor='inline-checkbox'
        className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
      >
        {props.placeholder}
      </label>
    </div>
  );
}
