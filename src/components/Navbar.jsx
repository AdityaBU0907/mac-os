import { navIcons, navLinks } from "#constants"

import dayjs from "dayjs"

const Navbar = () => {
  return (
    <nav>
        <div>
            <img src="/images/logo.svg" al={true} />
            <p className='font-bold px-0.5'>Aditya's Portfolio</p>

            <ul>
                {navLinks.map(({id,name}) => (
                    <li key={id}>
                        <p>{name}</p>
                    </li>
                ))}
            </ul>
        </div>

        {/* right side */}
        <div> 
            <ul>
                {
                    navIcons.map(({id,img}) =>(
                        <li key={id}>
                            <img src={img} className="icon-hover" alt={`icon-${id}`} />
                        </li>
                    ))
                }
            </ul>
            <time>{dayjs().format("dddd D MMM h:mm A")}</time>

        </div>



    </nav>
  )
}

export default Navbar