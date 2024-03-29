import { AuthContext } from '../../contexts/AuthContext'
import axios from 'axios'
import { useContext, useState,useEffect } from 'react'

function ModelUser({ setActive,match, getMatches}:{ setActive : any,match:any, getMatches: any}) {
    const {token} = useContext(AuthContext)
    const [data,setData] = useState<any>([])
    const [error,setError] = useState<string>('')
    
    const EditMatche = async(e : any) => {
        e.preventDefault()
        const data = {
            awayTeam: e.target.awayTeam.value,
            homeTeam :  e.target.homeTeam.value,
            channel :  e.target.channel.value,
            time :  e.target.ho.value + ':' + e.target.min.value,
            date :  e.target.date.value,
            league:  e.target.league.value,
            resume:  e.target.resume.value,
            homeTeamScore: e.target.homeTeamScore.value,
            awayTeamScore: e.target.awayTeamScore.value
        }
        if (!data.awayTeam || !data.homeTeam || !data.channel || !data.time || !data.date || !data.league) {
            setError('Please fill all the fields')
            return
        }
        if (data.time.split(':')[0] > '24' || data.time.split(':')[1] > '60') {
            setError('Please enter a valid time')
            return
        }
        if (data.awayTeam === data.homeTeam) {
            setError('Please select different teams')
            return
        }
        if (data.date.split('-')[0] < new Date().getFullYear()) {
            setError('Please enter a valid date')
            return
        }
        try {
            await axios.put(import.meta.env.VITE_API_URL+'matches/'+match._id, data,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            getMatches()
            setActive('')
        } catch (error) {
            console.log(error)
        }
    }

    const getData = async() => {
        try {
            const res = await axios.get(import.meta.env.VITE_API_URL+'matches/data',{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setData(res.data)
        } catch (error) {
            console.log(error)
        }
    } 

    useEffect(()=>{
        getData()
    },[])

  return (
    <div className='w-full  min-h-screen z-50 grid place-items-center bg-black/30  backdrop-blur-sm p-2 fixed top-0 left-0'>
        <form className='w-full md:min-w-[300px] bg-white shadow rounded p-4 md:max-w-xl' onSubmit={EditMatche}>
            <h1>
                Add teams
            </h1>
            <div className='p-2'>
                <select defaultValue={match.awayTeam._id} name="awayTeam" id="awayTeam" className='outline-none border border-gray-300 rounded p-2 w-full '>                    {
                        data && data.teams &&
                        data.teams.map((teams:any)=>{
                            return <option value={teams._id} selected={teams._id == match.awayTeam._id}>{teams.name}</option>
                        })
                    }
                </select>
            </div>
            <div className='p-2'>
                <select name="homeTeam" defaultValue={match.homeTeam._id} id="homeTeam" className='outline-none border border-gray-300 rounded p-2 w-full '>
                    <option value={match.homeTeam._id}>{match.homeTeam.name}</option>
                    {
                        data && data.teams &&
                        data.teams.map((teams:any)=>{
                            return <option value={teams._id} selected={teams._id == match.homeTeam._id}>{teams.name}</option>
                        })
                    }
                </select>
            </div>
            <div className='p-2'>
                <select name="league" defaultValue={match.league._id} id="league" className='outline-none border border-gray-300 rounded p-2 w-full '>
                    <option value={match.league._id}>{match.league.name}</option>
                    {
                        data && data.leagues &&
                        data.leagues.map((league:any)=>{
                            return <option value={league._id} selected={league._id == match.league._id}>{league.name}</option>
                        })
                    }
                </select>
            </div>
            <div className='p-2'>
                <select name="channel" defaultValue={match.channel._id} id="channel" className='outline-none border border-gray-300 rounded p-2 w-full '>
                    {
                        data && data.channels &&
                        data.channels.map((channel:any)=>{
                            return <option value={channel._id} selected={channel._id == match.channel._id}>{channel.name}</option>
                        })
                    }
                </select>
            </div>
            <div className='p-2 flex gap-2'>
                <input type="number" defaultValue={match.time.split(":")[0]}  id="time" name="ho" min="0" max="24" required   className='outline-none border border-gray-300 rounded p-2 w-full' />
                <input type="number" defaultValue={match.time.split(":")[1]} id="time" name="min" min="0" max="60" required   className='outline-none border border-gray-300 rounded p-2 w-full' />
            </div>
            <div className='p-2'>
                <input name='date' type="date" defaultValue={match.date.split("T")[0].split("/").reverse().join("-")}  className='outline-none border border-gray-300 rounded p-2 w-full' />
            </div>
            <div className='p-2'>
                <input placeholder='resume link' name='resume' type="text" defaultValue={match.resume} className='outline-none border border-gray-300 rounded p-2 w-full' />
            </div>
            <div className='p-2 flex gap-2'>
                <div className='w-full'>
                    <label htmlFor="homeTeamScore">{match.homeTeam.name}</label>
                    <input type="string" defaultValue={match.homeTeamScore} id="homeTeamScore" placeholder={match.homeTeam.name} name="homeTeamScore"   className='outline-none border border-gray-300 rounded p-2 w-full' />
                </div>
                <div className='w-full'>
                    <label htmlFor="awayTeamScore">{match.awayTeam.name}</label>
                    <input type="string" defaultValue={match.awayTeamScore} id="awayTeamScore" placeholder={match.awayTeam.name} name="awayTeamScore"   className='outline-none border border-gray-300 rounded p-2 w-full' />
                </div>
            </div>
            {error && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {error}
            </div>}
            <div className='p-2'>
                <button type='submit' className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 mb-2'>
                    update
                </button>
                <button onClick={()=>setActive('')}  className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 mb-2'>
                    Cancel
                </button>
            </div>
        </form>
    </div>
  )
}

export default ModelUser