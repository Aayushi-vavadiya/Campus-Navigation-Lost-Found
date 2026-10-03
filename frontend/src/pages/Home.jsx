function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Campus Navigation & Lost-and-Found Portal</h1>

          <p>
            Navigate your campus easily and find or report lost items
            through one centralized platform.
          </p>

          <div className="hero-buttons">
            <a href="/campus-map">
              <button>Explore Campus</button>
            </a>

            <a href="/lost-found">
              <button className="secondary-btn">Lost & Found</button>
            </a>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Everything You Need on Campus</h2>

        <div className="feature-container">

          <div className="feature-card">
            <div className="icon">🗺️</div>
            <h3>Campus Navigation</h3>
            <p>
              Find buildings, classrooms, labs and important locations
              using an interactive campus map.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">🔍</div>
            <h3>Lost & Found</h3>
            <p>
              Report lost items, search found items and connect with
              their owners.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">📍</div>
            <h3>Easy Location Search</h3>
            <p>
              Quickly search for campus locations and get useful
              information about them.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}

export default Home;