import Image from "next/image"
export default function DivBackground({ src }: {src:string}) { 
    return (
        <div className="relative px-8 w-screen h-screen mb-12 ">
            <Image src={src} fill alt={`src-${src}`}  />
        </div>
    )
}