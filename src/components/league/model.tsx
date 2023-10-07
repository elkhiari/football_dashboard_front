import { AuthContext } from '../../contexts/AuthContext'
import axios from 'axios'
import { useContext, useState } from 'react'

function ModelLeagues({ setActive, getLeagues}:{ setActive : any, getLeagues: any}) {
    const {token} = useContext(AuthContext)
    const [error,setError] = useState<string>('')
    

    const addLeague = async(e : any) => {
        e.preventDefault()
        const data = {
            name: e.target.name.value,
            logo: e.target.logo.value,
        }
        if (!data.name || !data.logo) {
            setError('Please fill all the fields')
            return
        }
        try {
            await axios.post(import.meta.env.VITE_API_URL+'leagues', data,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            getLeagues()
            setActive(false)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='w-full flex place-content-center place-items-center min-h-screen  backdrop-blur-sm p-2 fixed top-0 left-0'>
        <form className='w-full md:min-w-[300px] bg-white shadow rounded p-4' onSubmit={addLeague}>
            <h1>
                Add Leagues
            </h1>
            <div className='p-2'>
                <input name='name' type="text" placeholder="League name" className='outline-none border border-gray-300 rounded p-2 w-full' />
            </div>
            <div className='p-2'>
                <input name='logo' type="text" placeholder="League logo" className='outline-none border border-gray-300 rounded p-2 w-full' />
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

export default ModelLeagues