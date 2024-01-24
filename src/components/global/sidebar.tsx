import {IoMdFootball} from 'react-icons/io'
import {RiTeamFill} from 'react-icons/ri'
import {PiTelevisionSimpleDuotone} from 'react-icons/pi'
import {TbCategory, TbPlayFootball} from 'react-icons/tb'
import {TfiCup} from 'react-icons/tfi'
import { Link } from "react-router-dom"
import { useRef,useEffect } from "react"
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { IoIosFootball } from 'react-icons/io'

function Sidebar({isDrawerOpen, setIsDrawerOpen}:{isDrawerOpen: boolean , setIsDrawerOpen: any}) {
    const dropRef = useRef<HTMLDivElement>(null)
    const {user,logout} = useContext(AuthContext);

    useEffect(() => {
        const handleClickOutside = (event : any) => {
            if (dropRef.current && !dropRef.current.contains(event.target)) {
                setIsDrawerOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [dropRef])

    
  return (
        <aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${!isDrawerOpen && '-translate-x-full'} sm:translate-x-0`} aria-label="Sidebar" ref={dropRef}>
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <Link to="/" className="flex items-center pl-2.5 mb-5">
                    {/* <img src={logo} className="h-6 mr-3 sm:h-7" alt="Flowbite Logo" /> */}
                    
                    <IoIosFootball className="mr-3 text-2xl" />
                        <span className="self-center text-xl font-black whitespace-nowrap dark:text-white">Football</span>
                    {/* </span> */}
                </Link>
                <ul className="space-y-2 font-medium">
                    
                    <li>
                        <Link to="category" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <TbCategory className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                        <span className="flex-1 ml-3 whitespace-nowrap">Category</span>
                        {/* <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span> */}
                        </Link>
                    </li>
                    <li>
                        <Link to="league" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <TfiCup className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                        <span className="flex-1 ml-3 whitespace-nowrap">Leagues</span>
                        {/* <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span> */}
                        </Link>
                    </li>
                    <li>
                        <Link to="teams" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <RiTeamFill className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                        <span className="flex-1 ml-3 whitespace-nowrap">Teams</span>
                        {/* <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span> */}
                        </Link>
                    </li>
                    <li>
                        <Link to="channel" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <PiTelevisionSimpleDuotone className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                        <span className="flex-1 ml-3 whitespace-nowrap">Channel</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="matches" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <IoMdFootball className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                        <span className="flex-1 ml-3 whitespace-nowrap">Matches</span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="resume" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <TbPlayFootball className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                        <span className="flex-1 ml-3 whitespace-nowrap">Resume</span>
                        </Link>
                    </li>
                    {user.role === "admin" && <li>
                        <Link to="users" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                        </svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                        </Link>
                    </li>}
                    <li>
                        <Link onClick={logout} to="login" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                        </svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">Sign out</span>
                        </Link>
                    </li>
                    
                </ul>
            </div>
            </aside>
  )
}

export default Sidebar