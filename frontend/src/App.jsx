import { useState } from 'react';
import Knowledge from './Knowledge';
import About from './About';

function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('home');

  // Form Input States (Volunteer Form)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  const [statusMessage, setStatusMessage] = useState('');

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Volunteer Registration Submit
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setStatusMessage(data.message || 'Registration successful!');
      if (response.ok) {
        setFormData({ fullName: '', email: '', phone: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="work-sans-font">
      {/* Navbar */}
      <nav className="navbar display-flex">
        <h3 className="brand">🌿 Green Bangladesh</h3>
        <div className="nav-links">
          <button className="nav-link" onClick={() => setCurrentPage('home')}>
            <i className="fa-solid fa-house"></i> Home
          </button>
          <button className="nav-link" onClick={() => setCurrentPage('knowledge')}>
            <i className="fa-solid fa-book-bookmark"></i> Tree Encyclopedia
          </button>
          <button className="nav-link" onClick={() => setCurrentPage('about')}>
            <i className="fa-solid fa-address-card"></i> About Us
          </button>
          <button
            className="btn-join"
            onClick={() => {
              setCurrentPage('home');
              setTimeout(() => {
                document.getElementById('club')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          >
            <i className="fa-solid fa-people-roof"></i> Join Our community
          </button>
        </div>
      </nav>

      {/* Pages */}
      {currentPage === 'knowledge' && <Knowledge />}
      {currentPage === 'about' && <About />}

      {/* Home page */}
      {currentPage === 'home' && (
        <>
          {/* Banner */}
          <header>
            <div id="banner" className="banner display-flex">
              <div className="banner-content">
                <h1 className="banner-title">Green Bangladesh</h1>
                <p className="banner-description">
                  Join the largest youth-led movement to restore Bangladesh's green cover. From the Sundarbans to the streets of Dhaka.
                </p>
                <a href="#mission"><button className="btn-primary">Explore more</button></a>
              </div>
            </div>
          </header>

          <main>
            {/* MMisson section */}
            <section id="mission" className="mission-section">
              <div className="container">
                <h2 className="section-title">Why Should We Plant Trees?</h2>
                <div className="mission-grid">
                  <div className="mission-card">
                    <h3><i className="fa-solid fa-earth-americas"></i> Combat Climate Change</h3>
                    <p>
                      Bangladesh is on the frontlines of climate change and trees are our best defense against rising temperatures.
                      Reforestation and afforestation efforts, particularly of mangroves, are key strategies to protect coastal areas from cyclones and tidal surges.
                    </p>
                  </div>
                  <div className="mission-card">
                    <h3><i className="fa-solid fa-dove"></i> Restore Wildlife</h3>
                    <p>
                      Native trees provide essential homes for our local birds and pollinators like bees and butterflies.
                      Planting native trees is a highly effective way to help restore wildlife by providing essential food and shelter for local species.
                    </p>
                  </div>
                  <div className="mission-card">
                    <h3><i className="fa-solid fa-city"></i> Urban Cooling</h3>
                    <p>
                      Planting rooftop gardens and roadside trees effectively combats the Urban Heat Island (UHI) effect in concrete jungles like Dhaka and Chittagong.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Info section */}
            <section id="info" className="info-section display-flex">
              <div className="info-item">
                <h1 className="count">15000</h1>
                <p>Trees Planted</p>
              </div>
              <div className="info-item">
                <h1 className="count">50</h1>
                <p>Communities Served</p>
              </div>
              <div className="info-item">
                <h1 className="count">1200</h1>
                <p>Active Volunteers</p>
              </div>
            </section>

            {/* Knowledge section */}
            <section id="knowledge-preview" className="knowledge-section display-flex">
              <div className="knowledge-content">
                <h2>Know Your Roots <i className="fa-solid fa-seedling"></i></h2>
                <p>
                  Do you know which trees are native to Bangladesh? Or which ones heal diseases?<br />
                  Explore our digital database library.
                </p>
                <button
                  className="btn-secondary"
                  onClick={() => setCurrentPage('knowledge')}
                  style={{ cursor: 'pointer', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '5px' }}
                >
                  Open Tree Encyclopedia →
                </button>
              </div>
              <div className="knowledge-image">
                <img src="./images/knowledge.jpg" alt="Botany Book" />
              </div>
            </section>

            {/* PROJECTS SECTION */}
            <section id="projects" className="projects-section bg-light">
              <div className="container">
                <h2 className="section-title">Our Projects</h2>
                <div className="project-grid">
                  <div className="project-card">
                    <img src="./images/planting.jpg" alt="Planting" />
                    <div className="p-content">
                      <h4>Sundarbans Restoration</h4>
                      <p>Planting 5,000 Mangrove saplings to protect the coast.</p>
                    </div>
                  </div>
                  <div className="project-card">
                    <img src="./images/Jackfruit Tree.jpg" alt="Jackfruit Tree" />
                    <div className="p-content">
                      <h4>School Fruit Orchards</h4>
                      <p>Providing vitamin-rich fruit trees to rural schools.</p>
                    </div>
                  </div>
                  <div className="project-card">
                    <img src="./images/Rooftop.jpg" alt="Rooftop" />
                    <div className="p-content">
                      <h4>Dhaka Rooftop Campaign</h4>
                      <p>Turning grey concrete into green sanctuaries.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* VOLUNTEER FORM SECTION */}
            <section id="club" className="club-section display-flex">
              <div className="club-content">
                <h2>Tree Plantation Club <i className="fa-solid fa-people-roof"></i></h2>
                <p>
                  Join our mission to restore the city's green cover. As a volunteer, you get invites to our weekend planting drives and workshops.
                </p>
                <ul>
                  <li><i className="fa-brands fa-pagelines"></i> Monthly Planting Events</li>
                  <li><i className="fa-solid fa-bridge-circle-check"></i> Free Gardening Workshops</li>
                  <li><i className="fa-solid fa-handshake"></i> Community Meetups</li>
                </ul>
              </div>

              <div className="club-form">
                <h2>Join the Green Army</h2>
                <p>Register today as a volunteer for our next plantation drive.</p><br />

                <form onSubmit={handleRegister}>
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="example@gmail.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="123-456-7890"
                    />
                  </div>
                  <button type="submit" className="btn-submit">Register as Volunteer</button>
                </form>

                {statusMessage && <p style={{ marginTop: '1rem', color: 'green' }}>{statusMessage}</p>}
              </div>
            </section>
          </main>

          {/* FOOTER */}
          <footer>
            <p>&copy; 2026 Green Bangladesh Club. Let's breathe freely.</p>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;