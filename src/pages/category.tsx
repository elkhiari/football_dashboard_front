import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { AuthContext } from '../contexts/AuthContext';
import Modelcategorys from '../components/category/model';
import EditModel from '../components/category/modelEdit';
import Confirm from '../components/global/Confirm';


function Category() {
    const [modelActive, setModelActive] = useState<Boolean>(false)
    const {token, user} = useContext(AuthContext);
    const [Search, setSearch] = useState<any>('')
    const [deleteModel,setDeleteModel] = useState<string>('')
    const [categories, setCategories] = useState<any>([])
    const [modelEditActive,setModelEditActive] = useState<string>('')
    const [loading, setLoading] = useState<Boolean>(true)

    const deletecategory = async () => {
        setLoading(true)
        try {
            const res = await axios.delete(import.meta.env.VITE_API_URL+`category/${deleteModel}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res)
            getcategory()
            setDeleteModel('')
        } catch (error) {
            console.log(error)
        } finally {
        setLoading(false)
    }
    }

    

    const getcategory = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_API_URL+'category',{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setCategories(res.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        getcategory()
    },[])
  return (
    <>
    <div className='p-2 relative'>
        <h1 className='text-3xl font-bold mb-2'>
            category
        </h1>
        <div className=''>
            <button onClick={()=>setModelActive(true)} className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 mb-2'>
                Create category
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
                        
                        
                        categories &&
                        categories
                        .filter((category:any) => category.name.toLowerCase().includes(Search.toLowerCase()))
                        .map((category:any) => (
                            <div className='bg-white animation relative whitespace-nowrap flex md:flex-col   border rounded shadow p-2 md:place-content-center place-items-center space-x-2 md:space-x-0'>
                                {user.role === "admin" && <div className='w-6 h-6 rounded-full bg-red-500 absolute top-2 right-2 cursor-pointer' onClick={()=>setDeleteModel(category._id)}></div>}
                                {user.role === "admin" && <div className='w-6 h-6 rounded-full bg-blue-500 absolute top-2 right-10 cursor-pointer' onClick={()=>setModelEditActive(category)}></div>}
                                <img src={category.logo} alt={category.name} className='h-28 w-28 object-contain' />
                                <div >
                                    <h1 className='text-2xl font-bold mb-2'>
                                        {category.name}
                                    </h1>
                                </div>
                                
                            </div>
                        ))
                    }
                </div>
}
            </div>
        {deleteModel && <Confirm clickMe={deletecategory} setDeleteModel={setDeleteModel} />}
        {modelActive &&  <Modelcategorys  setActive={setModelActive} getcategory={getcategory} />}
        {modelEditActive &&  <EditModel category={modelEditActive}  setActive={setModelEditActive} getcategory={getcategory} />}
    </div>
    </>
  )
}

export default Category