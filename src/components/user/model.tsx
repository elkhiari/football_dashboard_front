import { AuthContext } from '../../contexts/AuthContext'
import axios from 'axios'
import { useContext, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

function ModelUser({ setActive, getUsers}:{ setActive : any, getUsers: any}) {
    const {token} = useContext(AuthContext)
    const [error,setError] = useState<string>('')
    const [showPassword, setShowPassword] = useState<string>("password")
    const [password, setPassword] = useState<string>(Math.random().toString(36).substr(2, 10))
    
    const addUser = async(e : any) => {
        e.preventDefault()
        const data = {
            username: e.target.username.value,
            password: e.target.password.value,
            email: e.target.email.value
        }
        if (data.username === "" || data.password === "" || data.email === "") {
            setError("Please fill all the fields")
            return
        }
        if (data.email.indexOf('@') === -1) {
            setError("Please enter a valid email")
            return
        }
        try {
            await axios.post(import.meta.env.VITE_API_URL+'users/add', data,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            getUsers()
            setActive(false)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='w-full  min-h-screen z-50 grid place-items-center bg-black/30  backdrop-blur-sm p-2 fixed top-0 left-0'>
        <form className='w-full  min-h-screen z-50 grid place-items-center bg-black/30  backdrop-blur-sm p-2 fixed top-0 left-0' onSubmit={addUser}>
            <h1>
                Add teams
            </h1>
            <div className='p-2'>
                <input name='username' type="text" placeholder="username" className='outline-none border border-gray-300 rounded p-2 w-full' />
            </div>
            <div className='p-2'>
                <input name='email' type="text" placeholder="example@gmail.com" className='outline-none border border-gray-300 rounded p-2 w-full' />
            </div>
            <div className='p-2 relative'>
                <input name='password' type={showPassword} onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="password" className='outline-none p-2 pr-8 relative border border-gray-300 rounded w-full' />
                <button className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer'>

                {
                    showPassword === "password" ?
                    <AiOutlineEye onClick={()=>setShowPassword("text")}   /> :
                    <AiOutlineEyeInvisible onClick={()=>setShowPassword("password")}   /> }
                </button>
            </div>
            {error && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {error}
            </div>}
            <div className='p-2'>
                <button type='submit' className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 mb-2'>
                    Add
                </button>
                <button onClick={()=>setActive(false)}  className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 mb-2'>
                    Cancel
                </button>
            </div>
        </form>
    </div>
  )
}

export default ModelUser