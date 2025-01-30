// import { useState, useEffect } from "react";

// interface Product {
//   id: number;
//   name: string;
//   author: string;
//   price: number;
//   fileExtension: string;
//   category: string;
//   averageRating: number;
//   description: string;
//   image: string;
// }

// const allProducts: Product[] = [
//   {
//     id: 1,
//     name: "Camiseta Estilosa",
//     author: "Marca XYZ",
//     price: 25.99,
//     fileExtension: "N/A",
//     category: "Ropa",
//     averageRating: 4.5,
//     description: "Camiseta de algodón, cómoda y a la moda.",
//     image: "https://placehold.co/400",
//   },
//   {
//     id: 2,
//     name: "Pantalones Vaqueros",
//     author: "Marca ABC",
//     price: 45.99,
//     fileExtension: "N/A",
//     category: "Ropa",
//     averageRating: 4.2,
//     description: "Pantalones de mezclilla de alta calidad.",
//     image: "https://placehold.co/400",
//   },
//   {
//     id: 3,
//     name: "Zapatos Deportivos",
//     author: "Marca LMN",
//     price: 59.99,
//     fileExtension: "N/A",
//     category: "Calzado",
//     averageRating: 4.8,
//     description: "Zapatos cómodos para correr o hacer ejercicio.",
//     image: "https://placehold.co/400",
//   },
//   {
//     id: 4,
//     name: "Sombrero Elegante",
//     author: "Marca ZZZ",
//     price: 15.99,
//     fileExtension: "N/A",
//     category: "Accesorios",
//     averageRating: 4.7,
//     description: "Sombrero con estilo para ocasiones especiales.",
//     image: "https://placehold.co/400",
//   },
// ];

// export const DashboardUser = () => {
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
//   const [cart, setCart] = useState<Product[]>([]);
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const [showBalanceModal, setShowBalanceModal] = useState<boolean>(false);
//   const [balanceRequest, setBalanceRequest] = useState<number>(0);
//   const [userBalance, setUserBalance] = useState<number>(100); // Balance inicial del usuario

//   const categories = ["Todos", "Ropa", "Calzado", "Accesorios"];

//   const filteredProducts = allProducts.filter((product) => {
//     const isNameMatch = product.name
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     const isCategoryMatch =
//       selectedCategory === "Todos" || product.category === selectedCategory;
//     return isNameMatch && isCategoryMatch;
//   });

//   // Cargar carrito desde el localStorage al iniciar la aplicación
//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCart(JSON.parse(savedCart));
//     }
//   }, []);

//   // Guardar el carrito en el localStorage cada vez que cambie
//   useEffect(() => {
//     if (cart.length > 0) {
//       localStorage.setItem("cart", JSON.stringify(cart));
//     } else {
//       localStorage.removeItem("cart");
//     }
//   }, [cart]);

//   const handleAddToCart = (product: Product) => {
//     const productExists = cart.some((item) => item.id === product.id);

//     if (productExists) {
//       alert(`El producto "${product.name}" ya está en el carrito.`);
//     } else {
//       setCart([...cart, product]);
//       alert(`¡Has agregado ${product.name} al carrito!`);
//     }
//   };

//   const handleRemoveFromCart = (productId: number) => {
//     const updatedCart = cart.filter((item) => item.id !== productId);
//     setCart(updatedCart);
//   };

//   const handleBuy = () => {
//     const totalAmount = cart.reduce((acc, product) => acc + product.price, 0);

//     if (totalAmount <= userBalance) {
//       alert("¡Compra realizada con éxito!");
//       setUserBalance(userBalance - totalAmount);
//       setCart([]); // Vaciar el carrito después de la compra
//       localStorage.removeItem("cart"); // Limpiar el carrito del localStorage
//     } else {
//       alert("No tienes suficiente saldo para realizar la compra.");
//     }
//   };

//   const handleRequestBalance = () => {
//     if (balanceRequest <= 0) {
//       alert("Por favor ingresa una cantidad válida.");
//     } else {
//       alert(
//         `Solicitud de saldo de $${balanceRequest} enviada al administrador.`
//       );
//       setUserBalance(userBalance + balanceRequest);
//       setBalanceRequest(0); // Limpiar el campo después de enviar la solicitud
//       setShowBalanceModal(false); // Cerrar el modal
//     }
//   };

//   // Calcular el total del carrito
//   const totalCartAmount = cart.reduce((acc, product) => acc + product.price, 0);

//   return (
//     <div className="container py-5">
//       <h1 className="text-center mb-4">Tienda de Productos</h1>

//       {/* Filtros y Buscador */}
//       <div className="d-flex justify-content-between mb-4">
//         <div className="w-50">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Buscar productos..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         <div className="w-25">
//           <select
//             className="form-select"
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//           >
//             {categories.map((category) => (
//               <option key={category} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Icono de carrito */}
//         <div className="position-relative">
//           <button
//             className="btn btn-info position-relative"
//             onClick={() => setShowModal(true)}
//           >
//             🛒 Carrito ({cart.length})
//           </button>
//         </div>

//         {/* Botón para abrir el modal de solicitud de saldo */}
//         <button
//           className="btn btn-warning ms-2"
//           onClick={() => setShowBalanceModal(true)}
//         >
//           Solicitar saldo
//         </button>
//       </div>

//       {/* Lista de Productos */}
//       <ul className="list-group gap-4">
//         {filteredProducts.map((product) => (
//           <li
//             className="list-group-item border border-3 rounded"
//             key={product.id}
//           >
//             <div className="d-flex align-items-center">
//               <img
//                 src={product.image}
//                 className="img-fluid rounded-start me-3"
//                 style={{ width: "220px", height: "220px", objectFit: "cover" }}
//                 alt={product.name}
//               />
//               <div>
//                 <h5>{product.name}</h5>
//                 <p>
//                   <strong>Autor:</strong> {product.author}
//                 </p>
//                 <p>
//                   <strong>Categoría:</strong> {product.category}
//                 </p>
//                 <p>
//                   <strong>Precio:</strong> ${product.price}
//                 </p>
//                 <p>
//                   <strong>Nota promedio:</strong> {product.averageRating} ⭐
//                 </p>
//                 <p>{product.description}</p>

//                 {/* Botón para agregar al carrito */}
//                 <button
//                   className="btn btn-primary rounded-3"
//                   onClick={() => handleAddToCart(product)}
//                 >
//                   Agregar al carrito
//                 </button>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {/* Modal del carrito */}
//       {showModal && (
//         <div
//           className="modal fade show"
//           id="cartModal"
//           tabIndex={-1}
//           aria-labelledby="cartModalLabel"
//           aria-hidden="false"
//           style={{ display: "block" }}
//         >
//           <div className="modal-dialog modal-lg">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title" id="cartModalLabel">
//                   Resumen del Carrito
//                 </h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setShowModal(false)}
//                   aria-label="Close"
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 {cart.length === 0 ? (
//                   <p>Tu carrito está vacío.</p>
//                 ) : (
//                   <ul className="list-group">
//                     {cart.map((item) => (
//                       <li
//                         key={item.id}
//                         className="list-group-item d-flex justify-content-between align-items-center"
//                       >
//                         <div>
//                           {item.name} - ${item.price}
//                         </div>
//                         <button
//                           className="btn btn-danger btn-sm"
//                           onClick={() => handleRemoveFromCart(item.id)}
//                         >
//                           Eliminar
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//                 {/* Mostrar total del carrito */}
//                 {cart.length > 0 && (
//                   <div className="mt-3">
//                     <h5>Total: ${totalCartAmount.toFixed(2)}</h5>
//                     <h6>Saldo disponible: ${userBalance}</h6>
//                   </div>
//                 )}
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setShowModal(false)}
//                 >
//                   Cerrar
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-success"
//                   onClick={handleBuy}
//                   disabled={cart.length === 0 || totalCartAmount > userBalance}
//                 >
//                   Realizar Compra
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modal para solicitar saldo */}
//       {showBalanceModal && (
//         <div
//           className="modal fade show"
//           id="balanceModal"
//           tabIndex={-1}
//           aria-labelledby="balanceModalLabel"
//           aria-hidden="false"
//           style={{ display: "block" }}
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title" id="balanceModalLabel">
//                   Solicitar Saldo
//                 </h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setShowBalanceModal(false)}
//                   aria-label="Close"
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="d-flex align-items-center gap-2">
//                   <input
//                     type="number"
//                     className="form-control"
//                     placeholder="Cantidad a solicitar"
//                     value={balanceRequest}
//                     onChange={(e) => setBalanceRequest(Number(e.target.value))}
//                   />
//                   <button
//                     className="btn btn-primary"
//                     onClick={handleRequestBalance}
//                   >
//                     Solicitar
//                   </button>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setShowBalanceModal(false)}
//                 >
//                   Cerrar
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Mostrar balance disponible */}
//       <p className="mt-3">Saldo disponible: ${userBalance}</p>
//     </div>
//   );
// };

import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  author: string;
  price: number;
  fileExtension: string;
  category: string;
  averageRating: number;
  description: string;
  image: string;
}

const allProducts: Product[] = [
  {
    id: 1,
    name: "Camiseta Estilosa",
    author: "Marca XYZ",
    price: 25.99,
    fileExtension: "N/A",
    category: "Ropa",
    averageRating: 4.5,
    description: "Camiseta de algodón, cómoda y a la moda.",
    image: "https://placehold.co/400",
  },
  {
    id: 2,
    name: "Pantalones Vaqueros",
    author: "Marca ABC",
    price: 45.99,
    fileExtension: "N/A",
    category: "Ropa",
    averageRating: 4.2,
    description: "Pantalones de mezclilla de alta calidad.",
    image: "https://placehold.co/400",
  },
  {
    id: 3,
    name: "Zapatos Deportivos",
    author: "Marca LMN",
    price: 59.99,
    fileExtension: "N/A",
    category: "Calzado",
    averageRating: 4.8,
    description: "Zapatos cómodos para correr o hacer ejercicio.",
    image: "https://placehold.co/400",
  },
  {
    id: 4,
    name: "Sombrero Elegante",
    author: "Marca ZZZ",
    price: 15.99,
    fileExtension: "N/A",
    category: "Accesorios",
    averageRating: 4.7,
    description: "Sombrero con estilo para ocasiones especiales.",
    image: "https://placehold.co/400",
  },
];

export const DashboardUser = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [cart, setCart] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showBalanceModal, setShowBalanceModal] = useState<boolean>(false);
  const [balanceRequest, setBalanceRequest] = useState<number>(0);
  const [userBalance, setUserBalance] = useState<number>(100); // Balance inicial del usuario
  const [purchasedProducts, setPurchasedProducts] = useState<Product[]>([]); // Productos comprados
  const [showPurchasedModal, setShowPurchasedModal] = useState<boolean>(false); // Modal para productos comprados

  const categories = ["Todos", "Ropa", "Calzado", "Accesorios"];

  const filteredProducts = allProducts.filter((product) => {
    const isNameMatch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const isCategoryMatch =
      selectedCategory === "Todos" || product.category === selectedCategory;
    return isNameMatch && isCategoryMatch;
  });

  // Cargar carrito y productos comprados desde el localStorage al iniciar la aplicación
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const savedPurchasedProducts = localStorage.getItem("purchasedProducts");
    if (savedPurchasedProducts) {
      setPurchasedProducts(JSON.parse(savedPurchasedProducts));
    }
  }, []);

  // Guardar carrito y productos comprados en el localStorage cada vez que cambien
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }

    if (purchasedProducts.length > 0) {
      localStorage.setItem(
        "purchasedProducts",
        JSON.stringify(purchasedProducts)
      );
    }
  }, [cart, purchasedProducts]);

  const handleAddToCart = (product: Product) => {
    const productExists = cart.some((item) => item.id === product.id);

    if (productExists) {
      alert(`El producto "${product.name}" ya está en el carrito.`);
    } else {
      setCart([...cart, product]);
      alert(`¡Has agregado ${product.name} al carrito!`);
    }
  };

  const handleRemoveFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const handleBuy = () => {
    const totalAmount = cart.reduce((acc, product) => acc + product.price, 0);

    if (totalAmount <= userBalance) {
      alert("¡Compra realizada con éxito!");
      setUserBalance(userBalance - totalAmount);
      setPurchasedProducts([...purchasedProducts, ...cart]); // Agregar los productos al historial de compras
      setCart([]); // Vaciar el carrito después de la compra
      localStorage.removeItem("cart"); // Limpiar el carrito del localStorage
    } else {
      alert("No tienes suficiente saldo para realizar la compra.");
    }
  };

  const handleRequestBalance = () => {
    if (balanceRequest <= 0) {
      alert("Por favor ingresa una cantidad válida.");
    } else {
      alert(
        `Solicitud de saldo de $${balanceRequest} enviada al administrador.`
      );
      setUserBalance(userBalance + balanceRequest);
      setBalanceRequest(0); // Limpiar el campo después de enviar la solicitud
      setShowBalanceModal(false); // Cerrar el modal
    }
  };

  const handleRemovePurchasedProduct = (productId: number) => {
    const updatedPurchasedProducts = purchasedProducts.filter(
      (item) => item.id !== productId
    );
    setPurchasedProducts(updatedPurchasedProducts);
  };

  // Calcular el total del carrito
  const totalCartAmount = cart.reduce((acc, product) => acc + product.price, 0);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Tienda de Productos</h1>

      {/* Filtros y Buscador */}
      <div className="d-flex justify-content-between mb-4">
        <div className="w-50">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="w-25">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Icono de carrito */}
        <div className="position-relative">
          <button
            className="btn btn-info position-relative"
            onClick={() => setShowModal(true)}
          >
            🛒 Carrito ({cart.length})
          </button>
        </div>

        {/* Botón para abrir el modal de productos comprados */}
        <div className="position-relative">
          <button
            className="btn btn-secondary ms-2"
            onClick={() => setShowPurchasedModal(true)}
          >
            🛍️ Productos Comprados
          </button>
        </div>

        {/* Botón para abrir el modal de solicitud de saldo */}
        <button
          className="btn btn-warning ms-2"
          onClick={() => setShowBalanceModal(true)}
        >
          Solicitar saldo
        </button>
      </div>

      {/* Lista de Productos */}
      <ul className="list-group gap-4">
        {filteredProducts.map((product) => (
          <li
            className="list-group-item border border-3 rounded"
            key={product.id}
          >
            <div className="d-flex align-items-center">
              <img
                src={product.image}
                className="img-fluid rounded-start me-3"
                style={{ width: "220px", height: "220px", objectFit: "cover" }}
                alt={product.name}
              />
              <div>
                <h5>{product.name}</h5>
                <p>
                  <strong>Autor:</strong> {product.author}
                </p>
                <p>
                  <strong>Categoría:</strong> {product.category}
                </p>
                <p>
                  <strong>Precio:</strong> ${product.price}
                </p>
                <p>
                  <strong>Nota promedio:</strong> {product.averageRating} ⭐
                </p>
                <p>{product.description}</p>

                {/* Botón para agregar al carrito */}
                <button
                  className="btn btn-primary rounded-3"
                  onClick={() => handleAddToCart(product)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal del carrito */}
      {showModal && (
        <div
          className="modal fade show"
          id="cartModal"
          tabIndex={-1}
          aria-labelledby="cartModalLabel"
          aria-hidden="false"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="cartModalLabel">
                  Resumen del Carrito
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {cart.length === 0 ? (
                  <p>Tu carrito está vacío.</p>
                ) : (
                  <ul className="list-group">
                    {cart.map((item) => (
                      <li
                        key={item.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          {item.name} - ${item.price}
                        </div>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          Eliminar
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {/* Mostrar total del carrito */}
                {cart.length > 0 && (
                  <div className="mt-3">
                    <h5>Total: ${totalCartAmount.toFixed(2)}</h5>
                    <h6>Saldo disponible: ${userBalance}</h6>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleBuy}
                  disabled={cart.length === 0 || totalCartAmount > userBalance}
                >
                  Realizar Compra
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para productos comprados */}
      {showPurchasedModal && (
        <div
          className="modal fade show"
          id="purchasedModal"
          tabIndex={-1}
          aria-labelledby="purchasedModalLabel"
          aria-hidden="false"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="purchasedModalLabel">
                  Productos Comprados
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowPurchasedModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {purchasedProducts.length === 0 ? (
                  <p>No has realizado ninguna compra aún.</p>
                ) : (
                  <ul className="list-group">
                    {purchasedProducts.map((product) => (
                      <li
                        key={product.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          {product.name} - ${product.price}
                        </div>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleRemovePurchasedProduct(product.id)
                          }
                        >
                          Eliminar
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowPurchasedModal(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para solicitar saldo */}
      {showBalanceModal && (
        <div
          className="modal fade show"
          id="balanceModal"
          tabIndex={-1}
          aria-labelledby="balanceModalLabel"
          aria-hidden="false"
          style={{ display: "block" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="balanceModalLabel">
                  Solicitar Saldo
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowBalanceModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Cantidad a solicitar"
                    value={balanceRequest}
                    onChange={(e) => setBalanceRequest(Number(e.target.value))}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handleRequestBalance}
                  >
                    Solicitar
                  </button>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowBalanceModal(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mostrar balance disponible */}
      <p className="mt-3">Saldo disponible: ${userBalance}</p>
    </div>
  );
};
