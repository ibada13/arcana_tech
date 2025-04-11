import Card from "./ui/Card";
import { pcs ,Pc } from "./data/pcsdata";
export default function Pcs() { 
    const items = ["Item 1", "Item 2", "Item 3", "Item 4"];
    return (
        <div id="pcs" className="mt-12 min-h-screen place-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-15 ">
            {pcs.map((item:Pc, index) => (
                <Card pc={item} key={`pc-${index}`}/>
            ))}
        </div>
    );
}