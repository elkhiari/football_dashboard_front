import { AuthContext } from '../../contexts/AuthContext'
import axios from 'axios'
import { useContext} from 'react'

function ModelMovie({ setActive, getMovies}:{ setActive : any, getMovies: any}) {
    const {token} = useContext(AuthContext)

    

    const addMovie = async(e : any) => {
        e.preventDefault()
        const data = {
            title: e.target.title.value,
            thumbnail: e.target.thumbnail.value,
            description: e.target.description.value,
            link: e.target.link.value
        }
        try {
            await axios.post(import.meta.env.VITE_API_URL+'movies', data,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            getMovies()
            setActive(false)
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div className='w-full  min-h-screen z-50 grid place-items-center bg-black/30  backdrop-blur-sm p-2 fixed top-0 left-0'>
        <form className='w-full md:min-w-[300px] bg-white shadow rounded p-4 md:max-w-xl' onSubmit={addMovie}>
            <h1>
                Add Movie
            </h1>
            <div className='p-2'>
                <input required name='title' type="text" placeholder="title" className='outline-none border border-gray-300 rounded p-2 w-full' />
            </div>
            <div className='p-2'>
                <input required name='thumbnail' type="text" placeholder="thumbnail" className='outline-none border border-gray-300 rounded p-2 w-full' />
            </div>
            <div className='p-2'>
                <input required name='link' type="text" placeholder="link" className='outline-none border border-gray-300 rounded p-2 w-full' />
            </div>
            <div className='p-2'>
                <input required name='description' type="text" placeholder="description" className='outline-none border border-gray-300 rounded p-2 w-full' />
            </div>
            
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

export default ModelMovie