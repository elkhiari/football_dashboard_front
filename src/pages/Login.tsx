import axios from 'axios'
import { useContext, useEffect,useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import {useNavigate} from 'react-router-dom'
import { FaLongArrowAltRight } from 'react-icons/fa'


function Login() {

    const {saveLogin} = useContext(AuthContext)
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Login"
    }, [])
    const log = async (e : any) => {
        setLoading(true)
        e.preventDefault()
        const data = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        await axios.post(import.meta.env.VITE_API_URL+'users/login', data)
        .then(res => {
            saveLogin(res.data.token, res.data.user)
            navigate("/")
        }).catch(err => {
            setError(err.response.data.message)
        }).finally(()=>{
            setLoading(false)
        })
    }
  return (
    <div className="w-full min-h-screen place-content-center place-items-center flex p-2">
        {loading ? 
        <div className='w-6 h-6 bg-gray-900 rounded animate-bounce'></div>
        : <form className="w-full md:w-[400px] " onSubmit={log}>
            <div className="mb-6">
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                <input type="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Elhiari" required />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            {error && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{error}</span>.
            </div>}
            <div className='w-full'>
                <button type="submit" className="text-white active:rounded-full duration-300 group flex place-content-center place-items-center bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm   px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <span className='tracking-widest group-hover:tracking-[3px] duration-300 group-hover:font-bold'>Login</span>
                    <FaLongArrowAltRight className="translate-x-10 group-hover:translate-x-24 duration-500" />
                </button>
            </div>
        </form>}

    </div>
  )
}

export default Login