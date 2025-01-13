import React, { useState } from "react";

interface Media {
  id: number;
  title: string;
  type: "image" | "video";
  url: string;
}

export const ContentsPage: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<Media[]>([
    {
      id: 1,
      title: "Imagen 1",
      type: "image",
      url: "https://img.freepik.com/foto-gratis/par-entrenadores_144627-3810.jpg",
    },
    {
      id: 2,
      title: "Video 1",
      type: "video",
      url: "https://img.freepik.com/foto-gratis/par-entrenadores_144627-3810.jpg",
    },
    {
      id: 3,
      title: "Imagen 2",
      type: "image",
      url: "https://img.freepik.com/foto-gratis/par-entrenadores_144627-3810.jpg",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [modalType, setModalType] = useState<"create" | "edit" | "view" | null>(
    null
  );
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  const handleShowModal = (type: "create" | "edit" | "view", media?: Media) => {
    setModalType(type);
    setSelectedMedia(media || null);
    const modal = new window.bootstrap.Modal(
      document.getElementById("mediaModal")!
    );
    modal.show();
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedMedia(null);
  };

  const handleCreate = (newMedia: Media) => {
    setMediaItems([...mediaItems, { ...newMedia, id: mediaItems.length + 1 }]);
    handleCloseModal();
  };

  const handleEdit = (updatedMedia: Media) => {
    setMediaItems(
      mediaItems.map((media) =>
        media.id === updatedMedia.id ? updatedMedia : media
      )
    );
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este contenido?")
    ) {
      setMediaItems(mediaItems.filter((media) => media.id !== id));
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredMedia = mediaItems.filter((media) =>
    media.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredMedia.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMedia = filteredMedia.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const media: Media = {
      id: selectedMedia?.id || 0,
      title: formData.get("title") as string,
      type: (formData.get("type") as "image" | "video") || "image",
      url: formData.get("url") as string,
    };
    modalType === "create" ? handleCreate(media) : handleEdit(media);
    const modal = window.bootstrap.Modal.getInstance(
      document.getElementById("mediaModal")!
    );
    modal?.hide();
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Administración de Contenidos Multimedia</h1>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Buscar contenido por título..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button
          className="btn btn-primary"
          onClick={() => handleShowModal("create")}
        >
          Crear Contenido
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedMedia.length > 0 ? (
            paginatedMedia.map((media) => (
              <tr key={media.id}>
                <td>{media.id}</td>
                <td>{media.title}</td>
                <td>{media.type === "image" ? "Imagen" : "Video"}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleShowModal("view", media)}
                  >
                    Ver
                  </button>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleShowModal("edit", media)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(media.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center">
                No se encontraron contenidos multimedia.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Anterior
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
      )}

      {/* Modal */}
      <div className="modal fade" id="mediaModal" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {modalType === "create" && "Crear Contenido"}
                {modalType === "edit" && "Editar Contenido"}
                {modalType === "view" && "Ver Contenido"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              {modalType === "view" && selectedMedia && (
                <div>
                  <p>
                    <strong>Título:</strong> {selectedMedia.title}
                  </p>
                  <p>
                    <strong>Tipo:</strong>{" "}
                    {selectedMedia.type === "image" ? "Imagen" : "Video"}
                  </p>
                  <div>
                    <strong>Vista previa:</strong>
                    {selectedMedia.type === "image" ? (
                      <img
                        src={selectedMedia.url}
                        alt={selectedMedia.title}
                        className="img-fluid"
                      />
                    ) : (
                      <video controls className="img-fluid">
                        <source src={selectedMedia.url} type="video/mp4" />
                        Tu navegador no soporta este formato de video.
                      </video>
                    )}
                  </div>
                </div>
              )}
              {(modalType === "create" || modalType === "edit") && (
                <form onSubmit={handleSubmitForm}>
                  <div className="mb-3">
                    <label className="form-label">Título</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      defaultValue={selectedMedia?.title || ""}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Tipo</label>
                    <select
                      className="form-control"
                      name="type"
                      defaultValue={selectedMedia?.type || "image"}
                    >
                      <option value="image">Imagen</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">URL</label>
                    <input
                      type="text"
                      className="form-control"
                      name="url"
                      defaultValue={selectedMedia?.url || ""}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {modalType === "create" ? "Crear" : "Guardar"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
