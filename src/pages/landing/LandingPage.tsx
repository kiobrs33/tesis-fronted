export const LandingPage = () => {
  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
      <section className="hero-section text-center bg-light py-5">
        <h2 className="mb-3">Explore Our Collection Victor</h2>
        <p className="mb-4">
          Discover the latest movies, music, games, and more.
        </p>
        <button className="btn btn-primary btn-lg">Shop Now</button>
      </section>

      {/* Featured Products */}
      <section className="featured-products py-5">
        <div className="container">
          <h3 className="text-center mb-4">Featured Products</h3>
          <div className="row">
            {/* Product Cards */}
            {[1, 2, 3].map((item) => (
              <div className="col-md-4 mb-4" key={item}>
                <div className="card">
                  <img
                    src={`https://img.freepik.com/foto-gratis/par-entrenadores_144627-3810.jpg`}
                    className="card-img-top"
                    alt={`Product ${item}`}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Product {item}</h5>
                    <p className="card-text">
                      Brief description of product {item}.
                    </p>
                    <a href="#" className="btn btn-primary">
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
