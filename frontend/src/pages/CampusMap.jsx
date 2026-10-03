import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Leaflet marker fix
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// =====================================================
// LDCE LOCATIONS
// =====================================================

const locations = [
  // ================================
  // DEPARTMENTS
  // ================================

  {
    id: "aiml",
    name: "Artificial Intelligence & Machine Learning",
    type: "Department",
    block: "Block 2",
    coordinates: [23.03345, 72.54595],
  },
  {
    id: "computer",
    name: "Computer Engineering",
    type: "Department",
    block: "Block 2",
    coordinates: [23.03340, 72.54590],
  },
  {
    id: "electrical",
    name: "Electrical Engineering",
    type: "Department",
    block: "Block 2",
    coordinates: [23.03350, 72.54600],
  },
  {
    id: "instrumentation",
    name: "Instrumentation & Control Engineering",
    type: "Department",
    block: "Block 2",
    coordinates: [23.03335, 72.54600],
  },
  {
    id: "automobile",
    name: "Automobile Engineering",
    type: "Department",
    block: "Block 6",
    coordinates: [23.03305, 72.54585],
  },
  {
    id: "civil",
    name: "Civil Engineering",
    type: "Department",
    block: "Block 6",
    coordinates: [23.03300, 72.54580],
  },
  {
    id: "mechanical",
    name: "Mechanical Engineering",
    type: "Department",
    block: "Block 6",
    coordinates: [23.03310, 72.54590],
  },
  {
    id: "robotics",
    name: "Robotics and Automation",
    type: "Department",
    block: "Block 6",
    coordinates: [23.03300, 72.54590],
  },
  {
    id: "chemical",
    name: "Chemical Engineering",
    type: "Department",
    block: "Block 7",
    coordinates: [23.03272, 72.54572],
  },
  {
    id: "rubber",
    name: "Rubber Technology",
    type: "Department",
    block: "Block 7",
    coordinates: [23.03268, 72.54568],
  },
  {
    id: "plastic",
    name: "Plastic Technology",
    type: "Department",
    block: "Block 7",
    coordinates: [23.03276, 72.54576],
  },
  {
    id: "textile",
    name: "Textile Technology",
    type: "Department",
    block: "Block 8",
    coordinates: [23.03248, 72.54592],
  },
  {
    id: "ec",
    name: "Electronics & Communication Engineering",
    type: "Department",
    block: "Block 9",
    coordinates: [23.03230, 72.54610],
  },
  {
    id: "environment",
    name: "Environment Engineering",
    type: "Department",
    block: "Block 9",
    coordinates: [23.03225, 72.54605],
  },
  {
    id: "biomedical",
    name: "Biomedical Engineering",
    type: "Department",
    block: "Block 10",
    coordinates: [23.03192, 72.54618],
  },
  {
    id: "it",
    name: "Information Technology",
    type: "Department",
    block: "Block 10",
    coordinates: [23.03185, 72.54615],
  },

  // ================================
  // FACILITIES
  // ================================

  {
    id: "main-gate",
    name: "Main Gate",
    type: "Facility",
    block: "Main Entrance",
    coordinates: [23.03370, 72.54595],
  },
  {
    id: "library",
    name: "Central Library",
    type: "Facility",
    block: "Library Building",
    coordinates: [23.03258, 72.54642],
  },
  {
    id: "placement",
    name: "Training & Placement Cell",
    type: "Facility",
    block: "Principal Office / Student Section",
    coordinates: [23.03328, 72.54638],
  },
  {
    id: "main-office",
    name: "Main Office",
    type: "Facility",
    block: "Principal Office",
    coordinates: [23.03335, 72.54635],
  },
  {
    id: "student-section",
    name: "Student Section",
    type: "Facility",
    block: "Principal Office / Student Section",
    coordinates: [23.03322, 72.54640],
  },
  {
    id: "admission",
    name: "Admission Cell",
    type: "Facility",
    block: "Main Office",
    coordinates: [23.03332, 72.54630],
  },
  {
    id: "canteen",
    name: "Canteen",
    type: "Facility",
    block: "Campus",
    coordinates: [23.03282, 72.54655],
  },
  {
    id: "workshop",
    name: "Workshop",
    type: "Facility",
    block: "Workshop Area",
    coordinates: [23.03215, 72.54562],
  },
  {
    id: "hostel",
    name: "Hostel",
    type: "Facility",
    block: "Hostel Area",
    coordinates: [23.03172, 72.54672],
  },
  {
    id: "sports",
    name: "Gymkhana / Sports Ground",
    type: "Facility",
    block: "Sports Area",
    coordinates: [23.03205, 72.54678],
  },
  {
    id: "ncc",
    name: "NCC",
    type: "Facility",
    block: "Campus",
    coordinates: [23.03220, 72.54692],
  },
  {
    id: "student-store",
    name: "Student Store",
    type: "Facility",
    block: "Campus",
    coordinates: [23.03300, 72.54648],
  },
  {
    id: "industry",
    name: "Industry Outreach Cell",
    type: "Facility",
    block: "Principal Office Area",
    coordinates: [23.03328, 72.54638],
  },
];

// =====================================================
// MOVE MAP
// =====================================================

function MapMover({ selectedLocation }) {
  const map = useMap();

  if (selectedLocation) {
    map.flyTo(selectedLocation.coordinates, 18, {
      duration: 1.2,
    });
  }

  return null;
}

// =====================================================
// CAMPUS MAP
// =====================================================

function CampusMap() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(locations);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // ===================================================
  // SEARCH BUTTON
  // ===================================================

  function handleSearch() {
    const text = searchText.trim().toLowerCase();

    if (text === "") {
      setSearchResults(locations);
      return;
    }

    const results = locations.filter((location) => {
      const name = location.name.toLowerCase();
      const type = location.type.toLowerCase();
      const block = location.block.toLowerCase();

      return (
        name.includes(text) ||
        type.includes(text) ||
        block.includes(text)
      );
    });

    setSearchResults(results);
  }

  // ===================================================
  // SELECT LOCATION
  // ===================================================

  function selectLocation(location) {
    setSelectedLocation({ ...location });
    setSearchText(location.name);
  }

  // ===================================================
  // GET DIRECTIONS
  // ===================================================

  function getDirections() {
    if (!selectedLocation) {
      alert("Please select a department or facility first.");
      return;
    }

    const destination = encodeURIComponent(
      `${selectedLocation.name}, L. D. College of Engineering, Ahmedabad, Gujarat`
    );

    const url =
      "https://www.google.com/maps/dir/?api=1" +
      `&destination=${destination}` +
      "&travelmode=walking";

    window.open(url, "_blank");
  }

  return (
    <div className="campus-map-page">

      {/* HEADER */}

      <div className="campus-header">
        <h1>LDCE Campus Map</h1>

        <p>
          Search and select any department or facility
          to find its location.
        </p>
      </div>

      {/* SEARCH */}

      <div className="campus-search-area">

        <div className="search-row">

          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Search department or facility..."
          />

          <button onClick={handleSearch}>
            Search
          </button>

        </div>

      </div>

      {/* LOCATION LIST */}

      <div className="location-selection-section">

        <h2>
          {searchText.trim()
            ? "Search Results"
            : "Select a Department or Facility"}
        </h2>

        {searchResults.length > 0 ? (

          <div className="location-selection-grid">

            {searchResults.map((location) => (

              <div
                key={location.id}
                className={
                  selectedLocation?.id === location.id
                    ? "location-select-card selected"
                    : "location-select-card"
                }
                onClick={() => selectLocation(location)}
              >

                <div className="location-icon">
                  {location.type === "Department"
                    ? "🏢"
                    : "📍"}
                </div>

                <div className="location-info">

                  <h3>
                    {location.name}
                  </h3>

                  <p>
                    {location.type} • {location.block}
                  </p>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="no-result-box">
            No department or facility found.
          </div>

        )}

      </div>

      {/* MAP */}

      <div className="interactive-map-section">

        <MapContainer
          center={[23.0325, 72.5462]}
          zoom={16}
          scrollWheelZoom={true}
          className="campus-leaflet-map"
        >

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapMover
            selectedLocation={selectedLocation}
          />

          {selectedLocation && (

            <Marker
              key={selectedLocation.id}
              position={selectedLocation.coordinates}
            >

              <Popup>

                <div className="map-popup">

                  <h3>
                    {selectedLocation.name}
                  </h3>

                  <p>
                    <strong>Type:</strong>{" "}
                    {selectedLocation.type}
                  </p>

                  <p>
                    <strong>Block:</strong>{" "}
                    {selectedLocation.block}
                  </p>

                  <button onClick={getDirections}>
                    Get Directions
                  </button>

                </div>

              </Popup>

            </Marker>

          )}

        </MapContainer>

      </div>

      {/* SELECTED LOCATION */}

      {selectedLocation && (

        <div className="selected-location-card">

          <div>

            <span className="selected-label">
              SELECTED LOCATION
            </span>

            <h2>
              {selectedLocation.name}
            </h2>

            <p>
              {selectedLocation.type} •{" "}
              {selectedLocation.block}
            </p>

          </div>

          <button onClick={getDirections}>
            📍 Get Directions
          </button>

        </div>

      )}

      {/* OFFICIAL LDCE MAP */}

      <div className="official-map-section">

        <h2>
          Official LDCE Campus Map
        </h2>

        <p>
          Use this official map as a reference for the
          LDCE campus layout.
        </p>

        <img
          src="https://ldce.ac.in/ldce_map.png"
          alt="Official LDCE Campus Map"
          className="official-ldce-map"
        />

      </div>

    </div>
  );
}

export default CampusMap;