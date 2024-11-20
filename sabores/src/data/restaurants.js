export const restaurantsData = [
  {
    id: 1,
    name: "Parrilla Don Julio",
    coords: [-34.8695, -58.0480],
    visited: true,
    rating: 4,
    specialty: "Parrilla y asado",
    hours: "12:00 - 23:00",
    phone: "+54 11 1234-5678",
    menu: {
      Entradas: [
        { name: "Chorizo", price: "$500" },
        { name: "Provoleta", price: "$700" },
      ],
      PlatosPrincipales: [
        { name: "Bife de chorizo", price: "$2,000" },
        { name: "Asado de tira", price: "$2,500" },
      ],
      Postres: [
        { name: "Flan con dulce de leche", price: "$800" },
        { name: "Helado artesanal", price: "$900" },
      ],
    },
  },
  {
    id: 2,
    name: "Pizzería La Farola",
    coords: [-34.8687, -58.0492],
    visited: false,
    rating: 5,
    specialty: "Pizzas artesanales",
    hours: "18:00 - 01:00",
    phone: "+54 11 8765-4321",
    menu: {
      Entradas: [
        { name: "Focaccia", price: "$500" },
        { name: "Bruschetta", price: "$600" },
      ],
      Pizzas: [
        { name: "Pizza Margarita", price: "$1,200" },
        { name: "Pizza Napolitana", price: "$1,500" },
      ],
      Postres: [
        { name: "Tiramisú", price: "$1,000" },
        { name: "Panna Cotta", price: "$900" },
      ],
    },
  },
  {
    id: 3,
    name: "Café de la Plaza",
    coords: [-34.8692, -58.0497],
    visited: true,
    rating: 3,
    specialty: "Desayunos y meriendas",
    hours: "08:00 - 20:00",
    phone: "+54 11 5555-5555",
    menu: {
      Bebidas: [
        { name: "Café Americano", price: "$400" },
        { name: "Té Verde", price: "$350" },
      ],
      PlatosPrincipales: [
        { name: "Tostadas con mermelada", price: "$600" },
        { name: "Croissant de jamón y queso", price: "$800" },
      ],
      Postres: [
        { name: "Torta de chocolate", price: "$1,000" },
        { name: "Cheesecake de frutos rojos", price: "$1,200" },
      ],
    },
  },
  {
    id: 4,
    name: "Restaurante Camino Centenario",
    coords: [-34.8721, -58.0074],
    visited: false,
    rating: 4,
    specialty: "Comida internacional",
    hours: "12:00 - 23:00",
    phone: "+54 11 4444-4444",
    menu: {
      Entradas: [
        { name: "Rollos primavera", price: "$900" },
        { name: "Ceviche", price: "$1,200" },
      ],
      PlatosPrincipales: [
        { name: "Pad Thai", price: "$2,500" },
        { name: "Risotto de hongos", price: "$2,800" },
      ],
      Postres: [
        { name: "Brownie con helado", price: "$1,300" },
        { name: "Crème brûlée", price: "$1,500" },
      ],
    },
  },
  {
    id: 5,
    name: "Burguer House Gonnet",
    coords: [-34.8710, -58.0065],
    visited: true,
    rating: 2.5,
    specialty: "Hamburguesas gourmet",
    hours: "17:00 - 23:00",
    phone: "+54 11 3333-3333",
    menu: {
      Entradas: [
        { name: "Papas fritas", price: "$500" },
        { name: "Aros de cebolla", price: "$600" },
      ],
      Hamburguesas: [
        { name: "Hamburguesa Clásica", price: "$1,500" },
        { name: "Hamburguesa BBQ", price: "$1,800" },
      ],
      Bebidas: [
        { name: "Limonada", price: "$400" },
        { name: "Cerveza Artesanal", price: "$800" },
      ],
    },
  },
  {
    id: 6,
    name: "Heladería Dolce Vita",
    coords: [-34.8675, -58.0489],
    visited: false,
    rating: 4.5,
    specialty: "Helados artesanales",
    hours: "11:00 - 23:00",
    phone: "+54 11 2222-2222",
    menu: {
      Helados: [
        { name: "Copa de Chocolate", price: "$700" },
        { name: "Helado de Frutilla", price: "$650" },
      ],
      Postres: [
        { name: "Copa Dolce Vita", price: "$1,000" },
        { name: "Banana Split", price: "$900" },
      ],
    },
  },
  {
    id: 7,
    name: "Rincón Vegano",
    coords: [-34.8701, -58.0478],
    visited: false,
    rating: 4,
    specialty: "Comida vegetariana",
    hours: "12:00 - 22:00",
    phone: "+54 11 1111-1111",
    menu: {
      Entradas: [
        { name: "Ensalada Caprese", price: "$700" },
        { name: "Hummus con pan pita", price: "$600" },
      ],
      PlatosPrincipales: [
        { name: "Bowl de quinoa", price: "$1,200" },
        { name: "Hamburguesa de lentejas", price: "$1,400" },
      ],
      Bebidas: [
        { name: "Agua saborizada", price: "$300" },
        { name: "Té helado", price: "$400" },
      ],
    },
  },
];
