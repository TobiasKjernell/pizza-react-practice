import { Link } from "react-router-dom";

const Button = ({ children, disabled, to, type }) => {
  
    const base = `bg-yellow-400 uppercase font-semibold text-stone-800
        inline-block cursor-pointer tracking-wide rounded-full hover:bg-yellow-300
          transition-colors duration-200 focus:outline-none focus:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2 
          disabled:cursor-not-allowed`

    const styles = {
        small: base + ' py-2 px-4 md:px-5 md:py-2.5 text-xs',
        primary: base + ' py-3 px-4 md:px-6 md:py-4',  
        secondary: `border-2 border-stone-300 uppercase font-semibold text-stone-400
        inline-block cursor-pointer tracking-wide rounded-full hover:bg-stone-300 hover:text-stone-800 focus:text-stone-800
          transition-colors duration-200 focus:outline-none focus:bg-stone-300 focus:ring focus:ring-stone-200 focus:ring-offset-2 
          disabled:cursor-not-allowed py-2.5 px-4 md:px-6 md:py-3.5`
    }

    if (to)
        return <Link className={styles[type]} to={to}>{children}</Link>

    return (
        <button disabled={disabled} className={styles[type]}>{children}</button>
    )
}

export default Button;