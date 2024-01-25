import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import {IoMdFootball} from 'react-icons/io'
import {RiMovie2Fill, RiTeamFill} from 'react-icons/ri'
import {PiTelevisionSimpleDuotone} from 'react-icons/pi'
import {TbCategory} from 'react-icons/tb'
import {TfiCup} from 'react-icons/tfi'
import { IoIosFootball } from 'react-icons/io'

function Home() {
    const {token} = useContext(AuthContext)
    const [data, setData] = useState<any>()
    const arr = [
        {name: "categorie", icon: <TbCategory className='text-6xl text-blue-600 p-1 ' />},
        {name: "channels", icon: < PiTelevisionSimpleDuotone className='text-6xl text-blue-600 p-1 '/>},
        {name: "movies", icon: <RiMovie2Fill className='text-6xl text-blue-600 p-1 '/>},
        {name: "users", icon: <IoIosFootball className='text-6xl text-blue-600 p-1 '/>},
        {name: "teams", icon: <RiTeamFill className='text-6xl text-blue-600 p-1 '/>},
        {name: "leagues", icon: <TfiCup className='text-6xl text-blue-600 p-1 '/>},
        {name: "matches", icon: <IoMdFootball className='text-6xl text-blue-600 p-1 '/>},
        {name: "todayMatches", icon: <IoMdFootball className='text-6xl text-blue-600 p-1 '/>},

    ]
    const getData = async() => {
        try {
            const res = await axios.get(import.meta.env.VITE_API_URL+'data',{
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
    
    <div className=" w-full">
        <div className="w-full mx-auto  grid grid-cols-1 md:grid-cols-2 gap-3  place-items-center">
            {
                data && 
                    arr.map((tee:any)=>(
                        <Card tee={tee.name} value={data[tee.name]} Icon={tee.icon} />
                    ))
                
            }
        </div>
    </div>
  )
}

const Card = ({tee, value, Icon}:any) => {
    return (
        <div className="w-full  shadow-md rounded p-10 grid grid-cols-2 place-items-center">
            <span className="text-center">
            {Icon}
            <span className="font-bold">{tee}</span>
            </span>
            <span className="font-black text-6xl">{value}</span>
        </div>
    )
}

export default Home