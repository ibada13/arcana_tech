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
        link: "/pcs",
        sublinks: [
            { title: "Gaming PCs", link: "/pcs/gaming" },
            { title: "Workstations", link: "/pcs/workstations" },
            { title: "Mini PCs", link: "/pcs/mini" },
            { title: "All-in-One PCs", link: "/pcs/all-in-one" },
            { title: "Barebone PCs", link: "/pcs/barebone" },
        ],
    },
    {
        title: "Components",
        link: "/components",
        sublinks: [
            { title: "RAM", link: "/components/ram" },
            { title: "CPU", link: "/components/cpu" },
            { title: "GPU", link: "/components/gpu" },
            { title: "Motherboards", link: "/components/motherboards" },
            { title: "Power Supplies", link: "/components/power-supplies" },
            { title: "Storage", link: "/components/storage" },
            { title: "Cooling Systems", link: "/components/cooling" },
            { title: "Cases", link: "/components/cases" },
            { title: "Sound Cards", link: "/components/sound-cards" },
        ],
    },
    {
        title: "Peripherals",
        link: "/peripherals",
        sublinks: [
            { title: "Keyboards", link: "/peripherals/keyboards" },
            { title: "Mice", link: "/peripherals/mice" },
            { title: "Monitors", link: "/peripherals/monitors" },
            { title: "Speakers", link: "/peripherals/speakers" },
            { title: "Headsets", link: "/peripherals/headsets" },
            { title: "Webcams", link: "/peripherals/webcams" },
            { title: "Microphones", link: "/peripherals/microphones" },
            { title: "Game Controllers", link: "/peripherals/game-controllers" },
        ],
    },
    {
        title: "Networking",
        link: "/networking",
        sublinks: [
            { title: "Routers", link: "/networking/routers" },
            { title: "Switches", link: "/networking/switches" },
            { title: "Network Cards", link: "/networking/network-cards" },
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
