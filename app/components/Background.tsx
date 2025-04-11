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
            <div className="absolute bg-gradient-to-b from-black/20  via-black/50 to-80% to-black w-full h-full"></div>
        </div>
    );
};

export default Background;
