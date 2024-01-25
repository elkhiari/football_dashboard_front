const Show = ({lien, setLien}:{lien: any,setLien:any}) => {
    return (
        <div className="min-w-full z-50 bg-black/30 backdrop-blur-sm grid place-content-center fixed min-h-screen top-0 right-0">
            <div className="relative">
            <div className='w-6 h-6 whitespace-nowrap rounded-full bg-red-500 absolute top-2 right-2 cursor-pointer' onClick={()=>setLien('')}></div>
                <iframe width="949" height="534" src={lien} title="Elif Dedim Enstrümantal 1 Saat (Fon Müzik)" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
            </div>
        </div>
    );
}

export default Show;