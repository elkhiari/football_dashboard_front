import {useState, useEffect, useContext} from 'react'
import ModelUser from '../components/user/model'
import axios from 'axios'
import { AuthContext } from '../contexts/AuthContext';
import Confirm from '../components/global/Confirm';


function Muser() {
    const [modelActive, setModelActive] = useState<Boolean>(false)
    const {token, user} = useContext(AuthContext);
    const [deleteModel,setDeleteModel] = useState<string>('')
    const [Search, setSearch] = useState<any>('')
    const [musers, setMusers] = useState<any>([])
    const [loading, setLoading] = useState<Boolean>(true)

    const DeleteUser = async () => {
        try {
            const res = await axios.delete(import.meta.env.VITE_API_URL+`users/delete/${deleteModel}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            getUsers()
            setDeleteModel('')
        } catch (error) {
            console.log(error)
        }
    }

    const getUsers = async () => {
        setLoading(true)
        try {
            const res = await axios.get(import.meta.env.VITE_API_URL+'users',{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setMusers(res.data.users)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        getUsers()
        
    },[])
  return (
    <>
    <div className='p-2 relative'>
        <h1 className='text-3xl font-bold mb-2'>
          Users
        </h1>
        <div className=''>
            <button onClick={()=>setModelActive(true)} className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 mb-2'>
                Create user
            </button>
        </div>
            <div className='mb-2 flex space-x-3'>
                <input type="text" placeholder="Search" className='outline-none border border-gray-300 rounded p-2 w-full'  onChange={(e)=>setSearch(e.target.value)}/>
            </div>
        <div className='w-full  '>
        {loading ?
            <div className='w-full  min-h-[300px] flex place-content-center place-items-center'>
                <div className="h-8 animate-bounce rounded w-8 bg-gray-900"></div>
            </div>:
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                    {
                        musers &&
                        musers
                        .filter((cuser:any) => cuser.username.toLowerCase().includes(Search.toLowerCase()))
                        .map((currentUser:any) => (
                          <div className={`bg-white relative whitespace-nowrap flex md:flex-col   border rounded shadow p-2 animation md:place-content-center place-items-center duration-300 space-x-2 md:space-x-0 ${currentUser.role === 'admin' && ' text-white  bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br'}`}>
                                {currentUser.username != "elkhiari" && user.username != currentUser.username && <div className='w-6 h-6 rounded-full bg-red-500 absolute top-2 right-2 cursor-pointer' onClick={()=>setDeleteModel(currentUser._id)}></div>}
                                {/* <img src={user.logo} alt={Muser.name} className='h-28 w-28 object-contain' /> */}
                                <div className='flex flex-col'>
                                    <h1 className='text-2xl font-bold mb-2'>
                                        {currentUser.username}
                                    </h1>
                                    <span className='text-sm font-medium'>
                                      {currentUser.email}
                                    </span>
                                </div>
                            </div>
                        ))
                    }
                </div>
                }
            </div>
        {deleteModel && <Confirm clickMe={DeleteUser} setDeleteModel={setDeleteModel} />}
        {modelActive &&  <ModelUser  setActive={setModelActive} getUsers={getUsers} />}
    </div>
    </>
  )
}

export default Muser