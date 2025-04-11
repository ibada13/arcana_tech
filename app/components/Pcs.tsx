import Card from "./ui/Card";

export default function Pcs() { 
    const items = ["Item 1", "Item 2", "Item 3", "Item 4"];
    return (
        <div id="pcs" className="min-h-screen bg-red-500 place-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {items.map((item, index) => (
                <Card key={`pc-${index}`}/>
            ))}
        </div>
    );
}