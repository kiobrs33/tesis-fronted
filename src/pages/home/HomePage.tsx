export const HomePage = () => {
  return (
    <div className="container-fluid">
      <h1 className="my-4 text-center">Admin Dashboard</h1>

      <div className="row mb-4">
        {/* Card for Clientes */}
        <div className="col-md-6 col-lg-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Clientes</h5>
              <p className="card-text">
                Gestiona y revisa los datos de tus clientes.
              </p>
              <a href="#" className="btn btn-primary">
                Ir a Clientes
              </a>
            </div>
          </div>
        </div>

        {/* Card for Pagos */}
        <div className="col-md-6 col-lg-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Pagos</h5>
              <p className="card-text">
                Administra y verifica los pagos realizados.
              </p>
              <a href="#" className="btn btn-success">
                Ir a Pagos
              </a>
            </div>
          </div>
        </div>

        {/* Card for Venta de imágenes */}
        <div className="col-md-6 col-lg-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Venta de Imágenes</h5>
              <p className="card-text">
                Gestiona las ventas y los productos relacionados.
              </p>
              <a href="#" className="btn btn-warning">
                Ir a Ventas
              </a>
            </div>
          </div>
        </div>

        {/* Card for Saldos */}
        <div className="col-md-6 col-lg-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Saldos</h5>
              <p className="card-text">
                Consulta y actualiza los saldos de los clientes.
              </p>
              <a href="#" className="btn btn-danger">
                Ir a Saldos
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Example Table for Recent Activity */}
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">Actividad Reciente</div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Módulo</th>
                      <th>Descripción</th>
                      <th>Fecha</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Clientes</td>
                      <td>Nuevo cliente agregado</td>
                      <td>2025-01-15</td>
                      <td>
                        <button className="btn btn-info btn-sm">
                          Ver Detalles
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Pagos</td>
                      <td>Pago confirmado</td>
                      <td>2025-01-14</td>
                      <td>
                        <button className="btn btn-info btn-sm">
                          Ver Detalles
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
