// import React, { useState } from "react";

// interface Media {
//   id: number;
//   title: string;
//   type: "image" | "video";
//   url: string;
// }

// export const ContentsPage: React.FC = () => {
//   const [mediaItems, setMediaItems] = useState<Media[]>([
//     {
//       id: 1,
//       title: "Imagen 1",
//       type: "image",
//       url: "https://img.freepik.com/foto-gratis/par-entrenadores_144627-3810.jpg",
//     },
//     {
//       id: 2,
//       title: "Video 1",
//       type: "video",
//       url: "https://img.freepik.com/foto-gratis/par-entrenadores_144627-3810.jpg",
//     },
//     {
//       id: 3,
//       title: "Imagen 2",
//       type: "image",
//       url: "https://img.freepik.com/foto-gratis/par-entrenadores_144627-3810.jpg",
//     },
//   ]);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const [modalType, setModalType] = useState<"create" | "edit" | "view" | null>(
//     null
//   );
//   const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

//   const handleShowModal = (type: "create" | "edit" | "view", media?: Media) => {
//     setModalType(type);
//     setSelectedMedia(media || null);
//     const modal = new window.bootstrap.Modal(
//       document.getElementById("mediaModal")!
//     );
//     modal.show();
//   };

//   const handleCloseModal = () => {
//     setModalType(null);
//     setSelectedMedia(null);
//   };

//   const handleCreate = (newMedia: Media) => {
//     setMediaItems([...mediaItems, { ...newMedia, id: mediaItems.length + 1 }]);
//     handleCloseModal();
//   };

//   const handleEdit = (updatedMedia: Media) => {
//     setMediaItems(
//       mediaItems.map((media) =>
//         media.id === updatedMedia.id ? updatedMedia : media
//       )
//     );
//     handleCloseModal();
//   };

//   const handleDelete = (id: number) => {
//     if (
//       window.confirm("¿Estás seguro de que deseas eliminar este contenido?")
//     ) {
//       setMediaItems(mediaItems.filter((media) => media.id !== id));
//     }
//   };

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//   };

//   const filteredMedia = mediaItems.filter((media) =>
//     media.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalItems = filteredMedia.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const paginatedMedia = filteredMedia.slice(startIndex, endIndex);

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const form = e.currentTarget;
//     const formData = new FormData(form);
//     const media: Media = {
//       id: selectedMedia?.id || 0,
//       title: formData.get("title") as string,
//       type: (formData.get("type") as "image" | "video") || "image",
//       url: formData.get("url") as string,
//     };
//     modalType === "create" ? handleCreate(media) : handleEdit(media);
//     const modal = window.bootstrap.Modal.getInstance(
//       document.getElementById("mediaModal")!
//     );
//     modal?.hide();
//   };

//   return (
//     <div className="container py-4">
//       <h1 className="mb-4">Administración de Contenidos Multimedia</h1>

//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <input
//           type="text"
//           className="form-control w-50"
//           placeholder="Buscar contenido por título..."
//           value={searchTerm}
//           onChange={handleSearch}
//         />
//         <button
//           className="btn btn-primary"
//           onClick={() => handleShowModal("create")}
//         >
//           Crear Contenido
//         </button>
//       </div>

//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Título</th>
//             <th>Tipo</th>
//             <th>Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedMedia.length > 0 ? (
//             paginatedMedia.map((media) => (
//               <tr key={media.id}>
//                 <td>{media.id}</td>
//                 <td>{media.title}</td>
//                 <td>{media.type === "image" ? "Imagen" : "Video"}</td>
//                 <td>
//                   <button
//                     className="btn btn-info btn-sm me-2"
//                     onClick={() => handleShowModal("view", media)}
//                   >
//                     Ver
//                   </button>
//                   <button
//                     className="btn btn-warning btn-sm me-2"
//                     onClick={() => handleShowModal("edit", media)}
//                   >
//                     Editar
//                   </button>
//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => handleDelete(media.id)}
//                   >
//                     Eliminar
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={4} className="text-center">
//                 No se encontraron contenidos multimedia.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {totalPages > 1 && (
//         <nav>
//           <ul className="pagination justify-content-center">
//             <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//               <button
//                 className="page-link"
//                 onClick={() => handlePageChange(currentPage - 1)}
//               >
//                 Anterior
//               </button>
//             </li>
//             {Array.from({ length: totalPages }, (_, index) => (
//               <li
//                 key={index}
//                 className={`page-item ${
//                   currentPage === index + 1 ? "active" : ""
//                 }`}
//               >
//                 <button
//                   className="page-link"
//                   onClick={() => handlePageChange(index + 1)}
//                 >
//                   {index + 1}
//                 </button>
//               </li>
//             ))}
//             <li
//               className={`page-item ${
//                 currentPage === totalPages ? "disabled" : ""
//               }`}
//             >
//               <button
//                 className="page-link"
//                 onClick={() => handlePageChange(currentPage + 1)}
//               >
//                 Siguiente
//               </button>
//             </li>
//           </ul>
//         </nav>
//       )}

//       {/* Modal */}
//       <div className="modal fade" id="mediaModal" tabIndex={-1}>
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">
//                 {modalType === "create" && "Crear Contenido"}
//                 {modalType === "edit" && "Editar Contenido"}
//                 {modalType === "view" && "Ver Contenido"}
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//                 onClick={handleCloseModal}
//               ></button>
//             </div>
//             <div className="modal-body">
//               {modalType === "view" && selectedMedia && (
//                 <div>
//                   <p>
//                     <strong>Título:</strong> {selectedMedia.title}
//                   </p>
//                   <p>
//                     <strong>Tipo:</strong>{" "}
//                     {selectedMedia.type === "image" ? "Imagen" : "Video"}
//                   </p>
//                   <div>
//                     <strong>Vista previa:</strong>
//                     {selectedMedia.type === "image" ? (
//                       <img
//                         src={selectedMedia.url}
//                         alt={selectedMedia.title}
//                         className="img-fluid"
//                       />
//                     ) : (
//                       <video controls className="img-fluid">
//                         <source src={selectedMedia.url} type="video/mp4" />
//                         Tu navegador no soporta este formato de video.
//                       </video>
//                     )}
//                   </div>
//                 </div>
//               )}
//               {(modalType === "create" || modalType === "edit") && (
//                 <form onSubmit={handleSubmitForm}>
//                   <div className="mb-3">
//                     <label className="form-label">Título</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="title"
//                       defaultValue={selectedMedia?.title || ""}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Tipo</label>
//                     <select
//                       className="form-control"
//                       name="type"
//                       defaultValue={selectedMedia?.type || "image"}
//                     >
//                       <option value="image">Imagen</option>
//                       <option value="video">Video</option>
//                     </select>
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">URL</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="url"
//                       defaultValue={selectedMedia?.url || ""}
//                       required
//                     />
//                   </div>
//                   <button type="submit" className="btn btn-primary">
//                     {modalType === "create" ? "Crear" : "Guardar"}
//                   </button>
//                 </form>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

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

const itemsPerPage = 8;

export const ContentsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Product>();

  const categories = ["Sonido", "Imagen", "Video"];
  const handleSelectCategory = (category: string) => {
    setValue("category", category); // Actualiza el valor del formulario con la categoría seleccionada
  };
  const selectedCategory = watch("category") || "Selecciona una categoría";

  useEffect(() => {
    // Verificamos si ya existen productos en el localStorage
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");

    // Si no hay productos, los agregamos
    if (storedProducts.length === 0) {
      const initialProducts: Product[] = [
        {
          id: 1,
          name: "Imagination",
          author: "Punk",
          price: 35,
          fileExtension: "N/A",
          category: "Sonido",
          averageRating: 4,
          description: "Musica de ambiente.",
          image: "https://www.youtube.com/embed/NE6pANWJGuU",
        },
        {
          id: 2,
          name: "Tecsup lo mejor!",
          author: "TECSUP",
          price: 45,
          fileExtension: "N/A",
          category: "Imagen",
          averageRating: 5,
          description: "El mejor institu de Arequipa",
          image:
            "https://estudiaperu.pe/wp-content/uploads/2019/12/Instituto-Tecnologico-Superior.jpg",
        },
        {
          id: 3,
          name: "Daft Punk",
          author: "Cabeza de robot!",
          price: 60,
          fileExtension: "N/A",
          category: "Video",
          averageRating: 4.8,
          description: "Las mejor musica.",
          image: "https://www.youtube.com/embed/4D7u5KF7SP8",
        },
        {
          id: 4,
          name: "Sombrero Elegante",
          author: "Marca A",
          price: 15,
          fileExtension: "N/A",
          category: "Video",
          averageRating: 4.7,
          description: "Sombrero con estilo para ocasiones especiales.",
          image: "https://www.youtube.com/embed/4D7u5KF7SP8",
        },
      ];

      // Guardamos los productos iniciales en localStorage
      localStorage.setItem("products", JSON.stringify(initialProducts));
      setProducts(initialProducts);
      setFilteredProducts(initialProducts);
    } else {
      setProducts(storedProducts);
      setFilteredProducts(storedProducts);
    }
  }, []);

  const onSubmit = (data: Product) => {
    let updatedProducts = [...products];
    if (selectedProduct) {
      updatedProducts = updatedProducts.map((product) =>
        product.id === selectedProduct.id ? { ...product, ...data } : product
      );
    } else {
      data.id = products.length + 1;
      updatedProducts.push(data);
    }
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    handleModalClose();
    showNotification("Producto guardado correctamente");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setCurrentPage(1); // Reseteamos la paginación al buscar

    if (term) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(term.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  };

  const handleModalShow = (action: string, product?: Product) => {
    setModalAction(action);
    setSelectedProduct(product || null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
    reset();
  };

  const handleDelete = (id: number) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    showNotification("Producto eliminado correctamente");
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 1000);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      {notification && (
        <div className="alert alert-success text-center" role="alert">
          {notification}
        </div>
      )}

      <h1 className="fs-3 mb-4">Administrar Productos Multimedia</h1>
      <div className="row mb-4 justify-content-center">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="col">
          <button
            className="btn btn-primary"
            onClick={() => handleModalShow("Crear")}
          >
            Crear Producto
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered align-middle">
          <thead className="table-primary text-center">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Autor</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Calificación Promedio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id} className="text-center">
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.author}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.averageRating}</td>
                <td>
                  <button
                    className="btn btn-outline-info btn-sm me-2"
                    onClick={() => handleModalShow("Ver", product)}
                  >
                    Ver
                  </button>
                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => handleModalShow("Editar", product)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                index + 1 === currentPage ? "active" : ""
              }`}
            >
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {showModal && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalAction} Producto</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleModalClose}
                ></button>
              </div>
              <div className="modal-body">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="needs-validation"
                >
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      {...register("name", {
                        required: "El nombre es requerido.",
                        value: selectedProduct?.name || "",
                      })}
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">
                        {errors.name.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Autor</label>
                    <input
                      {...register("author", {
                        required: "El autor es requerido.",
                        value: selectedProduct?.author || "",
                      })}
                      className={`form-control ${
                        errors.author ? "is-invalid" : ""
                      }`}
                    />
                    {errors.author && (
                      <div className="invalid-feedback">
                        {errors.author.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input
                      type="number"
                      {...register("price", {
                        required: "El precio es requerido.",
                        value: selectedProduct?.price || 0,
                        min: 0,
                      })}
                      className={`form-control ${
                        errors.price ? "is-invalid" : ""
                      }`}
                    />
                    {errors.price && (
                      <div className="invalid-feedback">
                        {errors.price.message}
                      </div>
                    )}
                  </div>

                  {/* <div className="mb-3">
                    <label className="form-label">Categoría</label>
                    <input
                      {...register("category", {
                        required: "La categoría es requerida.",
                        value: selectedProduct?.category || "",
                      })}
                      className={`form-control ${
                        errors.category ? "is-invalid" : ""
                      }`}
                    />
                    {errors.category && (
                      <div className="invalid-feedback">
                        {errors.category.message}
                      </div>
                    )}
                  </div> */}

                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                      Selecciona una categoría
                    </label>
                    <div className="dropdown">
                      <button
                        className="btn btn-outline-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {selectedCategory}
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        {categories.map((category) => (
                          <li key={category}>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={(e) => {
                                e.preventDefault(); // Evitar el comportamiento por defecto del link
                                handleSelectCategory(category);
                              }}
                            >
                              {category}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Este input oculta el valor seleccionado en el dropdown, pero lo mantiene en el formulario */}
                    {/* <input type="hidden" {...register("category")} /> */}
                    <input
                      type="hidden"
                      {...register("category", {
                        required: "La categoría es requerida.",
                        value: selectedProduct?.category || "",
                      })}
                      className={`form-control ${
                        errors.category ? "is-invalid" : ""
                      }`}
                    />
                    {errors.category && (
                      <div className="invalid-feedback">
                        {errors.category.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Calificación Promedio</label>
                    <input
                      type="number"
                      {...register("averageRating", {
                        required: "La calificación es requerida.",
                        value: selectedProduct?.averageRating || 0,
                        min: 0,
                        max: 5,
                      })}
                      className={`form-control ${
                        errors.averageRating ? "is-invalid" : ""
                      }`}
                    />
                    {errors.averageRating && (
                      <div className="invalid-feedback">
                        {errors.averageRating.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea
                      {...register("description", {
                        required: "La descripción es requerida.",
                        value: selectedProduct?.description || "",
                      })}
                      className={`form-control ${
                        errors.description ? "is-invalid" : ""
                      }`}
                    ></textarea>
                    {errors.description && (
                      <div className="invalid-feedback">
                        {errors.description.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Archivo</label>
                    <input
                      type="url"
                      {...register("image", {
                        required: "La imagen es requerida.",
                        value: selectedProduct?.image || "",
                      })}
                      className={`form-control ${
                        errors.image ? "is-invalid" : ""
                      }`}
                    />
                    {errors.image && (
                      <div className="invalid-feedback">
                        {errors.image.message}
                      </div>
                    )}
                  </div>

                  <button type="submit" className="btn btn-success">
                    Guardar
                  </button>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleModalClose}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
