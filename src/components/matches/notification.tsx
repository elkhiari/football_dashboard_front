import { AuthContext } from '../../contexts/AuthContext'
import axios from 'axios'
import { useContext } from 'react'

function NotificationMatch({ match, setMatch, getMatchStatus}:{ match : any, setMatch:any, getMatchStatus: any}){
    const {token} = useContext(AuthContext)
    const pushNotif = async (e : any) => {
        try {
            await axios.post(import.meta.env.VITE_API_URL+'notification/push', {
                title: match.homeTeam?.name + ' vs ' + match.awayTeam?.name ,
                body: e
              },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setMatch('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white rounded-lg relative w-full md:w-1/2 p-4'>
            <div className='w-6 h-6 whitespace-nowrap absolute right-2 top-2 rounded-full bg-red-500  cursor-pointer' onClick={()=>setMatch()}></div>
                <h1 className='text-2xl font-bold mb-2'>Push Notification</h1>
                <div>
                <div className='flex'>
                    <div className='flex flex-col items-center content-center w-2/5'>
                    <img src={match.homeTeam?.logo} alt={match.homeTeam?.name} className='h-20 w-20 object-contain' />
                    <h1 className='text-2xl font-bold text-center'>
                        {match.homeTeam?.name}
                    </h1>
                    </div>
                    <div className='w-1/5 text-center'>
                        <div>
                        {
                            getMatchStatus(match.date, match.time)
                        }
                        </div>
                        {
                        (getMatchStatus(match.date, match.time) == 'Playing' || getMatchStatus(match.date, match.time) == "Finished") && (
                            <div>
                            {match.homeTeamScore} - {match.awayTeamScore}
                            </div>
                            )
                        }
                    </div>
                    <div className='flex flex-col items-center content-center w-2/5'>
                        <img src={match.awayTeam?.logo} alt={match.awayTeam?.name} className='h-20 w-20 object-contain' />
                        <h1 className='text-2xl font-bold text-center'>
                            {match.awayTeam?.name}
                        </h1>
                    </div>
                </div>
                <div className='w-full flex place-content-center mt-5'>
                    <div className="inline-flex rounded-md max-w-3xl  shadow-sm mx-auto w-full " role="group">
                        <button type="button" onClick={()=>pushNotif(`لا تفوت! هناك مباراة اليوم :  ${match.time} `)} className="w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                            today match 
                        </button>
                        <button type="button" onClick={()=>pushNotif("5 دقائق على انطلاق المباراة! احصل على مقعدك واستعد للمباراة!")} className="w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                            5 minutes to start the match
                        </button>
                        <button onClick={()=>pushNotif("المباراة تبدأ. اربط حذائك وانضم للمشاهدة الآن!")} type="button" className="w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                            match start
                        </button>
                    </div>
                </div>
                <div className='w-full flex place-content-center mt-5'>
                    <div className="inline-flex rounded-md max-w-3xl  shadow-sm mx-auto w-full " role="group">
                        <button onClick={()=>pushNotif("استراحة نصف الوقت! استرخ واستعد لحركة النصف الثاني.")} type="button" className="w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                            half time
                        </button>
                        <button onClick={()=>pushNotif("انتهت المباراة! شكرا للانضمام. ترقبوا النقاط البارزة!")} type="button" className="w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                            match finished
                        </button>
                        <button onClick={()=>pushNotif("قبض على أفضل اللحظات! أبرز المباريات متاحة الآن.")} type="button" className="w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                            match resume
                        </button>
                    </div>
                </div>
                <div className='w-full flex place-content-center mt-5'>
                    <div className="inline-flex rounded-md max-w-3xl  shadow-sm mx-auto w-full " role="group">
                        <button onClick={()=>pushNotif(match.homeTeam?.name + " | " + " هدف! لحظة مثيرة - تم تسجيل هدف")} type="button" className="w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                            Goal scored {match.homeTeam?.name}
                        </button>
                        <button onClick={()=>pushNotif(match.awayTeam?.name  + " | " + " هدف! لحظة مثيرة - تم تسجيل هدف")} type="button" className="w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                            Goal scored {match.awayTeam?.name}
                        </button>
                        <button onClick={()=>pushNotif("استمع الآن. المباراة جارية!")} type="button" className="w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                            Match playing
                        </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )

}

export default NotificationMatch