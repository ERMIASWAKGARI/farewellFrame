const Input = ({ className = '', ...props }) => {
  return (
    <input
      className={`w-full px-4 py-2 rounded-md bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white shadow-md focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      {...props}
    />
  )
}

export default Input
