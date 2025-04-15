export default function NotFound() { 
    return (
        <div className="h-screen w-screen flex justify-center items-center gap-x-4 mt-32 ">
            <h1 className="text-4xl text-gray-500">Not Found</h1>
            <p className="text-4xl">|</p>
            <p className="text-red-400 text-4xl">404</p>
        </div>
    )
}