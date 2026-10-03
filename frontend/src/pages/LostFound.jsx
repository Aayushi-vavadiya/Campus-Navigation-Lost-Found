import { useEffect, useState } from "react";

function LostFound() {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("Lost");
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchText, setSearchText] = useState("");

  const [items, setItems] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    date: "",
    description: "",
  });

  // ==========================================
  // LOAD ITEMS FROM MONGODB
  // ==========================================

  useEffect(() => {
    fetch("http://localhost:5000/api/items", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error("Failed to load items:", error);
      });
  }, []);

  // ==========================================
  // OPEN FORM
  // ==========================================

  function openForm(type) {
    setFormType(type);
    setShowForm(true);
  }

  // ==========================================
  // CLOSE FORM
  // ==========================================

  function closeForm() {
    setShowForm(false);

    setFormData({
      name: "",
      category: "",
      location: "",
      date: "",
      description: "",
    });
  }

  // ==========================================
  // FORM CHANGE
  // ==========================================

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // ==========================================
  // SUBMIT ITEM
  // ==========================================

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.category ||
      !formData.location ||
      !formData.date
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const newItem = {
      name: formData.name,
      category: formData.category,
      location: formData.location,
      date: formData.date,
      status: formType.toUpperCase(),
      description:
        formData.description || "No description provided.",
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/items",
        {
          method: "POST",
          headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
},
          body: JSON.stringify(newItem),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save item");
      }

      const savedItem = await response.json();

      setItems((previousItems) => [
        savedItem,
        ...previousItems,
      ]);

      closeForm();

      alert(`${formType} item reported successfully!`);
    } catch (error) {
      console.error("Error:", error);

      alert(
        "Unable to save item. Please make sure the backend is running."
      );
    }
  }

  // ==========================================
  // FILTER ITEMS
  // ==========================================

  function getFilteredItems(status) {
    const search = searchText.trim().toLowerCase();

    return items.filter((item) => {
      return (
        item.status === status &&
        (search === "" ||
          item.name.toLowerCase().includes(search) ||
          item.category.toLowerCase().includes(search))
      );
    });
  }

  const lostItems = getFilteredItems("LOST");
  const foundItems = getFilteredItems("FOUND");

  return (
    <div className="lost-found-page">

      {/* PAGE TITLE */}

      <div className="lost-found-header">
        <h1>Lost & Found</h1>

        <p>
          Find lost items and report found items on campus.
        </p>
      </div>

      {/* BUTTONS */}

      <div className="lost-found-actions">

        <button
          className="lost-button"
          onClick={() => openForm("Lost")}
        >
          Report Lost Item
        </button>

        <button
          className="found-button"
          onClick={() => openForm("Found")}
        >
          Report Found Item
        </button>

      </div>

      {/* SEARCH */}

      <div className="lost-found-search">

        <input
          type="text"
          placeholder="Search item..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button>
          Search
        </button>

      </div>

      {/* ================= LOST ITEMS ================= */}

      <section className="simple-list-section">

        <h2 className="simple-section-title lost-title">
          LOST ITEMS
        </h2>

        {lostItems.length > 0 ? (

          <div className="simple-item-list">

            {lostItems.map((item) => (

              <div
                className="simple-item-row"
                key={item._id}
              >

                <span className="simple-item-name">
                  {item.name}
                </span>

                <button
                  className="simple-view-button"
                  onClick={() => setSelectedItem(item)}
                >
                  View Details
                </button>

              </div>

            ))}

          </div>

        ) : (

          <p className="no-items">
            No lost items found.
          </p>

        )}

      </section>

      {/* ================= FOUND ITEMS ================= */}

      <section className="simple-list-section found-list-section">

        <h2 className="simple-section-title found-title">
          FOUND ITEMS
        </h2>

        {foundItems.length > 0 ? (

          <div className="simple-item-list">

            {foundItems.map((item) => (

              <div
                className="simple-item-row"
                key={item._id}
              >

                <span className="simple-item-name">
                  {item.name}
                </span>

                <button
                  className="simple-view-button"
                  onClick={() => setSelectedItem(item)}
                >
                  View Details
                </button>

              </div>

            ))}

          </div>

        ) : (

          <p className="no-items">
            No found items available.
          </p>

        )}

      </section>

      {/* ================= REPORT FORM ================= */}

      {showForm && (

        <div className="report-form-container">

          <div className="report-form">

            <div className="form-header">

              <h2>
                {formType === "Lost"
                  ? "Report Lost Item"
                  : "Report Found Item"}
              </h2>

              <button
                className="close-form"
                onClick={closeForm}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <label>Item Name *</label>

              <input
                type="text"
                name="name"
                placeholder="Example: Black Wallet"
                value={formData.name}
                onChange={handleChange}
              />

              <label>Category *</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >

                <option value="">
                  Select Category
                </option>

                <option value="Electronics">
                  Electronics
                </option>

                <option value="ID Card">
                  ID Card
                </option>

                <option value="Books">
                  Books
                </option>

                <option value="Personal Item">
                  Personal Item
                </option>

                <option value="Stationery">
                  Stationery
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

              <label>
                {formType === "Lost"
                  ? "Last Seen Location *"
                  : "Where is the item currently kept? *"}
              </label>

              <input
                type="text"
                name="location"
                placeholder={
                  formType === "Lost"
                    ? "Example: Central Library"
                    : "Example: Student Section"
                }
                value={formData.location}
                onChange={handleChange}
              />

              <label>Date *</label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />

              <label>Description</label>

              <textarea
                name="description"
                placeholder="Add details about the item..."
                value={formData.description}
                onChange={handleChange}
              />

              <div className="form-buttons">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={closeForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="submit-button"
                >
                  Submit Report
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* ================= DETAILS ================= */}

      {selectedItem && (

        <div className="details-overlay">

          <div className="details-modal">

            <div className="details-header">

              <h2>Item Details</h2>

              <button
                className="close-details"
                onClick={() => setSelectedItem(null)}
              >
                ×
              </button>

            </div>

            <h3>
              {selectedItem.name}
            </h3>

            <div className="details-info">

              <p>
                <strong>Category:</strong>{" "}
                {selectedItem.category}
              </p>

              {selectedItem.status === "FOUND" ? (

                <div className="collection-location">

                  <strong>📍 Collect From</strong>

                  <p>
                    {selectedItem.location}
                  </p>

                  <small>
                    The item is currently kept at this
                    location. You can visit this place
                    to collect your item.
                  </small>

                </div>

              ) : (

                <p>
                  <strong>📍 Last Seen:</strong>{" "}
                  {selectedItem.location}
                </p>

              )}

              <p>
                <strong>📅 Date:</strong>{" "}
                {selectedItem.date}
              </p>

              <p>
                <strong>Description:</strong>{" "}
                {selectedItem.description}
              </p>

            </div>

            <button
              className="close-details-button"
              onClick={() => setSelectedItem(null)}
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default LostFound;