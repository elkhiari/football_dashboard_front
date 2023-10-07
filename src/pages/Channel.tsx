import {useState, useEffect, useContext} from 'react'
import ModelChannels from '../components/Channel/model'
import EditModelChannels from '../components/Channel/modelEdit'
import axios from 'axios'
import { AuthContext } from '../contexts/AuthContext';
import Confirm from '../components/global/Confirm';


function Channel() {
    const [modelActive, setModelActive] = useState<Boolean>(false)
    const {token, user} = useContext(AuthContext);
    const [deleteModel,setDeleteModel] = useState<string>('')
    const [modelEditActive,setModelEditActive] = useState<string>('')
    const [Search, setSearch] = useState<any>('')
    const [channels, setChannels] = useState<any>([])
    const [loading, setLoading] = useState<Boolean>(true)

    const deleteChannels = async () => {
        try {
            await axios.delete(import.meta.env.VITE_API_URL+`channel/${deleteModel}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            getChannels()
            setDeleteModel('')
        } catch (error) {
            console.log(error)
        }
    }

    const getChannels = async () => {
        setLoading(true)
        try {
            const res = await axios.get(import.meta.env.VITE_API_URL+'channel',{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setChannels(res.data.channels)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        getChannels()
        
    },[])
  return (
    <>
    <div className='p-2 relative'>
        <h1 className='text-3xl font-bold mb-2'>
          Channels
        </h1>
        <div className=''>
            <button onClick={()=>setModelActive(true)} className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 mb-2'>
                Create Channel
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
                        channels &&
                        channels
                        .filter((channel:any) => channel.name.toLowerCase().includes(Search.toLowerCase()))
                        .map((channel:any) => (
                          <div className='bg-white relative whitespace-nowrap flex md:flex-col   border rounded shadow p-2 animation md:place-content-center place-items-center space-x-2 md:space-x-0'>
                                {user.role === "admin" && <div className='w-6 h-6 rounded-full bg-red-500 absolute top-2 right-2 cursor-pointer' onClick={()=>setDeleteModel(channel._id)}></div>}
                                {user.role === "admin" && <div className='w-6 h-6 rounded-full bg-blue-500 absolute top-2 right-6 cursor-pointer' onClick={()=>setModelEditActive(channel)}></div>}
                                <img src={channel.logo} alt={channel.name} className='h-28 w-28 object-contain' />
                                <div>
                                    <h1 className='text-2xl font-bold mb-2'>
                                        {channel.name}
                                    </h1>
                                </div>
                                
                            </div>
                        ))
                    }
                </div>
                }
            </div>
        {deleteModel && <Confirm clickMe={deleteChannels} setDeleteModel={setDeleteModel} />}
        {modelActive &&  <ModelChannels  setActive={setModelActive} getChannels={getChannels} />}
        {modelEditActive &&  <EditModelChannels channel={modelEditActive}  setActive={setModelEditActive} getChannels={getChannels} />}
    </div>
    </>
  )
}

export default Channel