import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export const CarBuy: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);

  // Productos disponibles en la tienda
  const products: Product[] = [
    {
      id: 1,
      name: "Laptop HP",
      price: 1000,
      imageUrl: "https://via.placeholder.com/200x150?text=Laptop+HP",
    },
    {
      id: 2,
      name: "Smartphone Samsung",
      price: 800,
      imageUrl: "https://via.placeholder.com/200x150?text=Smartphone+Samsung",
    },
    {
      id: 3,
      name: "Auriculares Sony",
      price: 150,
      imageUrl: "https://via.placeholder.com/200x150?text=Auriculares+Sony",
    },
    {
      id: 4,
      name: "Reloj Garmin",
      price: 250,
      imageUrl: "https://via.placeholder.com/200x150?text=Reloj+Garmin",
    },
    {
      id: 5,
      name: "Cámara Canon",
      price: 1200,
      imageUrl: "https://via.placeholder.com/200x150?text=Cámara+Canon",
    },
  ];

  // Función para agregar productos al carrito
  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Función para obtener el total del carrito
  const getTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  return (
    <div className="container">
      <header className="my-4 text-center">
        <h1 className="display-4">Tienda Online</h1>
        <p className="lead">
          Encuentra los mejores productos electrónicos aquí
        </p>
      </header>

      <div className="row">
        {/* Filtro y búsqueda (opcional) */}
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Filtros</h5>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar productos"
              />
            </div>
          </div>
        </div>

        {/* Productos */}
        <div className="col-md-9">
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <div className="card shadow-sm">
                  <img
                    src={product.imageUrl}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">${product.price}</p>
                    <button
                      className="btn btn-warning"
                      onClick={() => addToCart(product)}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carrito */}
      <div className="fixed-bottom bg-light p-3">
        <h4>Carrito</h4>
        <ul className="list-group">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <li key={index} className="list-group-item">
                {item.name} - ${item.price}
              </li>
            ))
          ) : (
            <li className="list-group-item">Carrito vacío</li>
          )}
        </ul>
        <h5 className="mt-2">Total: ${getTotal()}</h5>
        {cart.length > 0 && (
          <button className="btn btn-success mt-3 w-100">Ir a pagar</button>
        )}
      </div>
    </div>
  );
};
