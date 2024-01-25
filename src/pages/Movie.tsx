import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import ModelMovie from "../components/movie/model"
import ModelMovieEdit from "../components/movie/modelEdit"
import Confirm from "../components/global/Confirm"
import Show from "../components/movie/show"

function Movie() {
    const [movies, setMovies] = useState<any>([])
    const [isActive, setIsActive] = useState<any>()
    const [todelete, setTodelete] = useState<any>()
    const [toEdit, setToEdit] = useState<any>()
    const [lien, setLien] = useState<any>()

    const {token} = useContext(AuthContext)

    const deleteMovies = async () => {
      try {
          await axios.delete(import.meta.env.VITE_API_URL+`movies/${todelete}`,{
              headers: {
                  Authorization: `Bearer ${token}`
              }
          })
          getMovies()
          setTodelete('')
      } catch (error) {
          console.log(error)
      }
  }

    const getMovies = async () => {

      try {
          const res = await axios.get(import.meta.env.VITE_API_URL+`movies`,{
              headers: {
                  Authorization: `Bearer ${token}`
              }
          })
          setMovies(res.data)
      } catch (error) {
          console.log(error)
      }
  }

  useEffect(()=>{
      getMovies()
  },[])
  return (
    <div className='p-2 relative'>
      <h1 className='text-3xl font-bold mb-2'>
          Movies
      </h1>
      <div className=''>
            <button onClick={()=>setIsActive(true)} className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 mb-2'>
                Create Movie
            </button>
        </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-col-7 gap-4">
        {movies && movies.map((movie:any) => (
            <Card movie={movie} setToEdit={setToEdit} setTodelete={setTodelete} setLien={setLien}/>
        ))}
        </div>
        {todelete && <Confirm clickMe={deleteMovies} setDeleteModel={setTodelete} />}
        {toEdit && <ModelMovieEdit getMovies={getMovies} setActive={setToEdit} active={toEdit} />}
        {isActive && <ModelMovie getMovies={getMovies} setActive={setIsActive} />}
        {lien && <Show setLien={setLien} lien={lien} />}
    </div>

    
  )
}

const Card = ({movie, setToEdit, setTodelete, setLien}:any) => {
  return (
    <div  className="flex flex-col place-items-center group relative">
      <div  className="w-32 lg:w-40 xl:w-48 bg-[#100f12] rounded-xl relative shadow-xl overflow-hidden">
      <div className="absolute top-2 right-2 flex space-x-3 z-[21]">
          <div className='w-6 h-6 whitespace-nowrap rounded-full bg-blue-500  cursor-pointer' onClick={()=>setToEdit(movie)}></div>
          <div className='w-6 h-6 whitespace-nowrap rounded-full bg-red-500  cursor-pointer' onClick={()=>setTodelete(movie._id)}></div>
          <div className='w-6 h-6 whitespace-nowrap rounded-full bg-green-500  cursor-pointer' onClick={()=>setLien(movie.link)}></div>
      </div>
          <img src={movie.thumbnail} className="w-full group-hover:opacity-50 duration-300 rounded-t-xl" />
          <div className="absolute bg-gradient-to-l from-[#100f12] group-hover:opacity-100 opacity-0 duration-300 top-0 right-0 h-full w-1/2 z-10"></div>
          <div className="absolute bg-gradient-to-r from-[#100f12] group-hover:opacity-100 opacity-0 duration-300 top-0 left-0 h-full w-1/2 z-10"></div>
          <div className="absolute bg-gradient-to-t from-[#100f12] group-hover:opacity-100 opacity-0 duration-300 bottom-0 right-0 h-1/2 w-full z-10"></div>
          <div className="absolute bg-gradient-to-b from-[#100f12] group-hover:opacity-100 opacity-0 duration-300 top-0 right-0 h-1/2 w-full z-10"></div>
          <div className="absolute top-0 left-0  z-20 h-full w-full opacity-0  group-hover:block duration-300 group-hover:opacity-100">
                  <div className="absolute bottom-2 text-center w-full px-1 days text-white">
                      {movie.title}
                  </div>
          </div>
      </div>
  </div>
  )
}

export default Movie

