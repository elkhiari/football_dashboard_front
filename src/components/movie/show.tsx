const Show = ({lien, setLien}:{lien: any,setLien:any}) => {
    return (
        <div className="min-w-full z-50 bg-black/30 backdrop-blur-sm grid place-content-center fixed min-h-screen top-0 right-0">
            <div className="relative">
            <div className='w-6 h-6 z-50 whitespace-nowrap rounded-full bg-red-500 absolute top-2 right-2 cursor-pointer' onClick={()=>setLien('')}></div>
            <iframe src={lien} className="w-[600px] h-[400px]" title="Iframe Example"></iframe> 
            </div>
        </div>
    );
}

export default Show;