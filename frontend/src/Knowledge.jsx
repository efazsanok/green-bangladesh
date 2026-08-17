import { useState, useEffect } from 'react';

function Knowledge() {
  const [trees, setTrees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/trees')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data from backend');
        return res.json();
      })
      .then((data) => {
        setTrees(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching tree data:', err);
        setErrorMsg('Could not connect to database on port 5000.');
        setLoading(false);
      });
  }, []);

  // Real-time filtering by category and search term
  const filteredTrees = trees.filter((tree) => {
    const matchesCategory =
      activeCategory === 'all' || tree.category?.toLowerCase() === activeCategory.toLowerCase();

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      tree.name?.toLowerCase().includes(query) ||
      tree.scientific_name?.toLowerCase().includes(query) ||
      tree.description?.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="work-sans-font">
      <header>
        <div className="header-section">
          <h1>Trees of Bangladesh</h1>
          <p>Explore the native flora, crops, and timber that keep our country green and healthy.</p>
        </div>

        <div className="search-container">
          <input
            type="text"
            id="searchInput"
            placeholder="Search trees (e.g., Krishnachura, Mango, Tea)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-container">
          <button
            className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            Show All
          </button>
          <button
            className={`filter-btn ${activeCategory === 'fruit' ? 'active' : ''}`}
            onClick={() => setActiveCategory('fruit')}
          >
            Fruits 🥭
          </button>
          <button
            className={`filter-btn ${activeCategory === 'flower' ? 'active' : ''}`}
            onClick={() => setActiveCategory('flower')}
          >
            Flowers 🌺
          </button>
          <button
            className={`filter-btn ${activeCategory === 'medicine' ? 'active' : ''}`}
            onClick={() => setActiveCategory('medicine')}
          >
            Medicinal 🌿
          </button>
          <button
            className={`filter-btn ${activeCategory === 'food' ? 'active' : ''}`}
            onClick={() => setActiveCategory('food')}
          >
            Food Source 🌾
          </button>
          <button
            className={`filter-btn ${activeCategory === 'timber' ? 'active' : ''}`}
            onClick={() => setActiveCategory('timber')}
          >
            Timber & Wood 🪵
          </button>
        </div>
      </header>

      <main className="tree-section">
        {loading ? (
          <p style={{ textAlign: 'center', margin: '2rem 0' }}>Loading Tree Encyclopedia...</p>
        ) : errorMsg ? (
          <p style={{ textAlign: 'center', margin: '2rem 0', color: 'red' }}>{errorMsg}</p>
        ) : filteredTrees.length === 0 ? (
          <p style={{ textAlign: 'center', margin: '2rem 0' }}>No trees found matching "{searchQuery}".</p>
        ) : (
          <section className="tree-grid">
            {filteredTrees.map((tree) => (
              <div
                key={tree.id}
                className={`tree-card category-${tree.category?.toLowerCase()}`}
                style={{ display: 'flex' }}
              >
                <img src={tree.image_url} className="tree-img" alt={tree.name} />
                <div className="card-content">
                  <span className={`badge bg-${tree.category?.toLowerCase()}`}>
                    {tree.category}
                  </span>
                  <h3>{tree.name}</h3>
                  <p className="scientific-name">{tree.scientific_name}</p>
                  <p>{tree.description}</p>
                </div>
                <div className="info-footer">{tree.info_footer}</div>
              </div>
            ))}
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer>
        <p>&copy; 2026 Green Bangladesh Club. Let's breathe freely.</p>
      </footer>
    </div>
  );
}

export default Knowledge;