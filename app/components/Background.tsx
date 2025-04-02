import Image from "next/image"
const Backgorund = () => { 
    return (
        <div className="  absolute w-screen h-[80vh] md:h-[120vh] left-0 top-0 -z-10 overflow-hidden">
            <Image
                priority
                layout="fill"
                objectFit="cover"
                className="scale-110  " src="/background.jpg" alt="backgorund picture " />
            
            <div className="absolute bg-black/50 w-full h-full" ></div>
        </div>
    )
}


export default Backgorund