export type ProductProps = {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  image: string;
  description: string;
  saleStart: Date;
  saleEnd: Date;
  totalStock: number;
};

export const PRODUCT = {
  id: "limited-001",
  name: "Steam Machine",
  price: "999.99",
  originalPrice: "1299.99",
  image: "/steam-machine.avif",
  description: `Steam Machine is a series of small form factor gaming computers by
    Valve, designed to operate SteamOS to provide a home game
    console-like experience. The first iteration of the Steam Machine
    was developed in collaboration with several computer vendors who
    were engaged with Valve to develop their own versions of Steam
    Machines for retail, offering additional options atop Valve's
    requirements such as dual-booting options with Windows and the
    ability to upgrade the computer.`,
  saleStart: new Date("2026-02-01T00:00:00Z"),
  saleEnd: new Date("2026-03-01T00:00:00Z"),
  totalStock: 10000,
};
