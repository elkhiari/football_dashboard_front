import {useState, useEffect, useContext} from 'react'
import Modelmatches from '../components/matches/model'
import ModelEdit from '../components/matches/modelEdit'
import axios from 'axios'
import { AuthContext } from '../contexts/AuthContext';
import Confirm from '../components/global/Confirm';


function Matches() {
    const [modelActive, setModelActive] = useState<Boolean>('')
    const [modelEditActive, setModelEditActive] = useState<string>('')
    const {token, user} = useContext(AuthContext);
    const [deleteModel,setDeleteModel] = useState<string>('')
    const [Search, setSearch] = useState<any>('')
    const [filter,setFilter] = useState<string>('all')
    const [matches, setMatches] = useState<any>([])
    const [loading, setLoading] = useState<Boolean>(true)

    const deleteMatches = async () => {
        try {
            await axios.delete(import.meta.env.VITE_API_URL+`matches/${deleteModel}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            getMatches()
            setDeleteModel('')
        } catch (error) {
            console.log(error)
        }
    }

    const getMatches = async () => {
        setLoading(true)
        try {
            const res = await axios.get(import.meta.env.VITE_API_URL+`matches/${filter}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setMatches(res.data.matches)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        getMatches()
        
    },[filter])

    function getMatchStatus(matchDate : any, matchTime : string) {
      const now : any = new Date();
      const matchDateTime : any = new Date(matchDate);
      const [hours, minutes] = matchTime.split(':');
      matchDateTime.setHours(Number(hours), Number(minutes), 0, 0);
    
      if (
        matchDateTime.getDate() === now.getDate() &&
        matchDateTime.getMonth() === now.getMonth() &&
        matchDateTime.getFullYear() === now.getFullYear()
      ) {
        if (now < matchDateTime) {
          return `Today at ${matchTime}`;
        } else if (now >= matchDateTime && now - matchDateTime <= 90 * 60 * 1000) {
          return 'Playing';
        } else {
          return 'Finished';
        }
      } else {
        return matchDate.split('T')[0];
      }
    }
    
  return (
    <>
    <div className='p-2 relative'>
        <h1 className='text-3xl font-bold mb-2'>
            Matches
        </h1>
        <div className=''>
            <button onClick={()=>setModelActive(true)} className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 mb-2'>
                Create Match
            </button>
        </div>
            <div className='mb-2 flex space-x-3'>
                <input type="text" placeholder="Search" className='outline-none border border-gray-300 rounded p-2 w-full'  onChange={(e)=>setSearch(e.target.value)}/>
                <select className='outline-none border border-gray-300 rounded p-2 w-full' onChange={(e)=>setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="today">Today</option>
                    <option value="tomorrow">Tomorrow</option>
                    <option value="yesterday">Yesterday</option>
                </select>
            </div>
        <div className='w-full  '>
        {loading ?
            <div className='w-full  min-h-[300px] flex place-content-center place-items-center'>
                <div className="h-8 animate-bounce rounded w-8 bg-gray-900"></div>
            </div>:
            <div className='grid grid-cols-1  lg:grid-cols-2 2xl:grid-cols-3  gap-4'>
                    {
                        matches &&
                        matches
                        .filter((match:any) => match.homeTeam.name.toLowerCase().includes(Search.toLowerCase()) ||  match.awayTeam.name.toLowerCase().includes(Search.toLowerCase()))
                        .map((match:any) => (
                            <div className='flex bg-slate-50 p-2 shadow rounded relative justify-around items-center'>
                                {user.role === "admin" && <div className='w-6 h-6 whitespace-nowrap rounded-full bg-red-500 absolute top-2 right-2 cursor-pointer' onClick={()=>setDeleteModel(match._id)}></div>}
                                {user.role === "admin" && <div className='w-6 h-6 whitespace-nowrap rounded-full bg-blue-500 absolute top-2 right-10 cursor-pointer' onClick={()=>setModelEditActive(match)}></div>}
                                    <div className='flex flex-col items-center content-center w-2/5'>
                                      <img src={match.homeTeam?.logo} alt={match.homeTeam?.name} className='h-20 w-20 object-contain' />
                                      <h1 className='text-2xl font-bold text-center'>
                                          {match.homeTeam?.name}
                                      </h1>
                                    </div>
                                    <div className='w-1/5 text-center'>
                                      <span>
                                        {
                                          getMatchStatus(match.date, match.time)
                                        }
                                      </span>
                                    </div>
                                    <div className='flex flex-col items-center content-center w-2/5'>
                                      <img src={match.awayTeam?.logo} alt={match.awayTeam?.name} className='h-20 w-20 object-contain' />
                                      <h1 className='text-2xl font-bold text-center'>
                                          {match.awayTeam?.name}
                                      </h1>
                                    </div>
                                
                            </div>
                        ))
                    }
                </div>
                }
            </div>
        {deleteModel && <Confirm clickMe={deleteMatches} setDeleteModel={setDeleteModel} />}
        {modelActive &&  <Modelmatches  setActive={setModelActive} getMatches={getMatches} />}
        {modelEditActive &&  <ModelEdit match={modelEditActive} setActive={setModelEditActive} getMatches={getMatches} />}
    </div>
    </>
  )
}

export default Matches