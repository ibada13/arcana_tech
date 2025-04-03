import Image from "next/image";

const Background = () => { 
    return (
        <div className="relative w-screen h-[120vh] overflow-hidden">
            <Image
                priority
                layout="fill"
                objectFit="cover"
                className="scale-110"
                src="/background.jpg"
                alt="background picture"
            />
            <div className="absolute bg-black/50 w-full h-full"></div>
        </div>
    );
};

export default Background;
