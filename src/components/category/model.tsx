import { AuthContext } from '../../contexts/AuthContext'
import axios from 'axios'
import { useContext} from 'react'

function Modelcategory({ setActive, getcategory}:{ setActive : any, getcategory: any}) {
    const {token} = useContext(AuthContext)

    

    const addTeam = async(e : any) => {
        e.preventDefault()
        const data = {
            name: e.target.name.value,
            logo: e.target.logo.value,
            link: e.target.description.value
        }
        try {
            await axios.post(import.meta.env.VITE_API_URL+'category', data,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            getcategory()
            setActive(false)
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div className='w-full  min-h-screen  backdrop-blur-sm p-2 absolute top-0 left-0'>
        <form className='w-full md:min-w-[300px] bg-white shadow rounded p-4' onSubmit={addTeam}>
            <h1>
                Add category
            </h1>
            <div className='p-2'>
                <input required name='name' type="text" placeholder="Name" className='outline-none border border-gray-300 rounded p-2 w-full' />
            </div>
            <div className='p-2'>
                <input required name='logo' type="text" placeholder="Logo" className='outline-none border border-gray-300 rounded p-2 w-full' />
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

export default Modelcategory