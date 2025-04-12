import Card from "./ui/Card";

export default function Products({ title, apiroute ,proucts_size=6 ,products}: {title:string , apiroute? :string , proucts_size? :number , products:any[] }) { 
    return (
        <div className="flex flex-col gap-y-12 px-8 mb-18">
            <h1 className="text-white  font-bold uppercase text-4xl">{ title}</h1>
        <div id="pcs" className="w-full self-center  min-h-screen place-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-15 ">

            {products.slice(0,proucts_size).map((item:any, index) => (
                <Card product={item} key={`pc-${index}`}/>
            ))}
        </div>
            </div>
    );
}