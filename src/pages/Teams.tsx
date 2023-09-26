import {useState, useEffect, useContext} from 'react'
import ModelTeams from '../components/teams/model'
import axios from 'axios'
import { AuthContext } from '../contexts/AuthContext';
import Confirm from '../components/global/Confirm';


function Teams() {
    const [modelActive, setModelActive] = useState<Boolean>(false)
    const {token, user} = useContext(AuthContext);
    const [deleteModel,setDeleteModel] = useState<string>('')
    const [Search, setSearch] = useState<any>('')
    const [teams, setTeams] = useState<any>([])
    const [loading, setLoading] = useState<Boolean>(true)

    const deleteTeams = async () => {
        try {
            await axios.delete(import.meta.env.VITE_API_URL+`teams/${deleteModel}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            getTeams()
            setDeleteModel('')
        } catch (error) {
            console.log(error)
        }
    }

    const getTeams = async () => {
        setLoading(true)
        try {
            const res = await axios.get(import.meta.env.VITE_API_URL+'teams',{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTeams(res.data.teams)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        getTeams()
        
    },[])
  return (
    <>
    <div className='p-2 relative'>
        <h1 className='text-3xl font-bold mb-2'>
            Teams
        </h1>
        <div className=''>
            <button onClick={()=>setModelActive(true)} className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 mb-2'>
                Create Team
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
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-4'>
                    {
                        teams &&
                        teams
                        .filter((team:any) => team.name.toLowerCase().includes(Search.toLowerCase()))
                        .map((team:any) => (
                            <div className='bg-white animation flex border rounded shadow relative p-2  place-items-center space-x-2'>
                                {user.role === "admin" && <div className='w-6 h-6 whitespace-nowrap rounded-full bg-red-500 absolute top-2 right-2 cursor-pointer' onClick={()=>setDeleteModel(team._id)}></div>}
                                <img src={team.logo} alt={team.name} className='h-28 w-28 object-contain' />
                                <div>
                                    <h1 className='text-2xl font-bold mb-2'>
                                        {team.name}
                                    </h1>
                                    <span className='text-sm font-medium'>
                                        {team.league.name}
                                    </span>
                                </div>
                                
                            </div>
                        ))
                    }
                </div>
                }
            </div>
        {deleteModel && <Confirm clickMe={deleteTeams} setDeleteModel={setDeleteModel} />}
        {modelActive &&  <ModelTeams  setActive={setModelActive} getTeams={getTeams} />}
    </div>
    </>
  )
}

export default Teams