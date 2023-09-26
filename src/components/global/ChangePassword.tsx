import Cookies from "js-cookie"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import axios from "axios"
import {FaLongArrowAltRight} from 'react-icons/fa'

function AddProfile() {
    const {user, token, getMe} = useContext(AuthContext)
    const [haveAPicture, setHaveAPicture] = useState<boolean>(true)
    const [file,setFile] = useState<any>();


    const handleImageChange = (file : any) => {
    
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            return (reader.result);
          };
          reader.readAsDataURL(file);
        }
      };

      const uploadProfile = async() => {
        if(!file) return
        try {
            const res = await axios.put(import.meta.env.VITE_API_URL+'users/profile',{
                file
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // getMe()
        } catch (error) {
            console.log(error)
        }
      }

    
    const setHaveProfile = async() => {
        setHaveAPicture(true)
        try {
            const res = await axios.post(import.meta.env.VITE_API_URL+'users/profile',{},{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            getMe()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if (user.defaultProfile) {
            setHaveAPicture(false)
        }
    })

    useEffect(()=>{

    })
  return (

    <>
        {
            !haveAPicture &&
            <div className="backdrop-filter flex place-content-center place-items-center p-2 backdrop-blur-sm bg-slate-300 bg-opacity-30 fixed top-0 left-0 w-full h-full z-50" >
                
                <div className="w-full space-y-5 relative flex-col max-w-lg bg-white rounded flex shadow p-2">
                    <div className="w-8 h-8 bg-red-500 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full" onClick={setHaveProfile}></div>
                    <h1 className="font-bold text-center">
                        You don't have a profile picture. Choose one.
                    </h1>
                    <div className=" mx-auto">
                        <label htmlFor="picture" >
                            <div className="w-28 h-28 rounded-full border   cursor-pointer">
                                <img src={handleImageChange(file) || "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"} className="w-full h-full rounded-full object-cover" />
                            </div>
                        </label>
                        <input onChange={(e)=>
                            {if(e.target.files) setFile(e.target.files[0])}} id="picture" type="file" className="hidden" />
                    </div>
                    <div className="px-20">
                        <button onClick={uploadProfile} type="button" className="text-white active:rounded-full duration-300 group flex place-content-center place-items-center bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm   px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <span className='tracking-widest group-hover:tracking-[3px] duration-300 group-hover:font-bold'>Upload</span>
                            <FaLongArrowAltRight className="translate-x-10 group-hover:translate-x-24 duration-500" />
                        </button>
                    </div>
                </div>

            </div>
        }
    </>
  )
}

export default AddProfile