interface link { 
    title: string, 
    link :string ,
}


interface navlink { 
    title: string, 
    link: string,
    sublinks :link[] ,
}

export const navLinks: navlink[] = [
    {
        title: "PCs",
        link: "/products",
        sublinks: [
            { title: "Gaming PCs", link: "/products/gaming" },
            { title: "Workstations", link: "/products/workstations" },
            { title: "Mini PCs", link: "/products/mini" },
            { title: "All-in-One PCs", link: "/products/all-in-one" },
            { title: "Barebone PCs", link: "/products/barebone" },
        ],
    },
    {
        title: "Components",
        link: "/components",
        sublinks: [
            { title: "RAM", link: "/products/ram" },
            { title: "CPU", link: "/products/cpu" },
            { title: "GPU", link: "/products/gpu" },
            { title: "Motherboards", link: "/products/motherboards" },
            { title: "Power Supplies", link: "/products/power-supplies" },
            { title: "Storage", link: "/products/storage" },
            { title: "Cooling Systems", link: "/products/cooling" },
            { title: "Cases", link: "/products/cases" },
            { title: "Sound Cards", link: "/products/sound-cards" },
        ],
    },
    {
        title: "Peripherals",
        link: "/peripherals",
        sublinks: [
            { title: "Keyboards", link: "/products/keyboards" },
            { title: "Mice", link: "/products/mice" },
            { title: "Monitors", link: "/products/monitors" },
            { title: "Speakers", link: "/products/speakers" },
            { title: "Headsets", link: "/products/headsets" },
            { title: "Webcams", link: "/products/webcams" },
            { title: "Microphones", link: "/products/microphones" },
            { title: "Game Controllers", link: "/products/game-controllers" },
        ],
    },
    {
        title: "Networking",
        link: "/networking",
        sublinks: [
            { title: "Routers", link: "/products/routers" },
            { title: "Switches", link: "/products/switches" },
            { title: "Network Cards", link: "/products/network-cards" },
        ],
    },
    {
        title: "Sold Items",
        link: "/sold",
        sublinks: [
            { title: "Refurbished PCs", link: "/sold/refurbished-pcs" },
            { title: "Used Components", link: "/sold/used-components" },
            { title: "Clearance Peripherals", link: "/sold/clearance-peripherals" },
        ],
    }
];
