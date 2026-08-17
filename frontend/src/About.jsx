import { useState } from 'react';

function About() {
    const [formData, setFormData] = useState({ fullName: '', email: '', phone: '' });
    const [statusMessage, setStatusMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            setStatusMessage(data.message);
            if (response.ok) setFormData({ fullName: '', email: '', phone: '' });
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="work-sans-font">
            <header className="about-header">
                <h1>Our Story & Mission</h1>
                <p>Building a Greener Future for Bangladesh, One Sapling at a Time.</p>
            </header>

            <main>
                <div className="blog-container">
                    <section className="blog-section">
                        <h2>About Us</h2>
                        <p>
                            <strong>Green Bangladesh</strong> is more than just a website; we are a growing community of
                            students, professionals, and nature enthusiasts dedicated to saving our environment. Founded in
                            2024, our goal is simple: to combat the rising temperatures in our cities and restore the natural
                            beauty of our motherland.
                        </p>
                        <p>
                            Whether you have a rooftop garden in Dhaka or a large backyard in Sylhet, we believe everyone can
                            contribute to a greener planet. We act as a bridge between people who want to plant trees and the
                            knowledge they need to do it right.
                        </p>
                    </section>

                    <section className="blog-section">
                        <h2>What We Do</h2>
                        <p>We don't just talk about trees; we get our hands dirty! Our activities are designed to educate and inspire action.</p>

                        <div className="activity-grid">
                            <div className="activity-card">
                                <span className="activity-icon"><i className="fa-solid fa-people-group"></i></span>
                                <h3>Educational Seminars</h3>
                                <p>We organize seminars in schools and colleges to teach the younger generation about climate change and ecology.</p>
                            </div>

                            <div className="activity-card">
                                <span className="activity-icon"><i className="fa-solid fa-seedling"></i></span>
                                <h3>Plantation Drives</h3>
                                <p>Monthly events where volunteers gather to plant saplings in barren lands, parks, and roadsides.</p>
                            </div>

                            <div className="activity-card">
                                <span className="activity-icon"><i className="fa-solid fa-hammer"></i></span>
                                <h3>Gardening Workshops</h3>
                                <p>Free training on how to maintain rooftop gardens, make organic fertilizer, and choose the right soil.</p>
                            </div>
                        </div>
                    </section>

                    <section className="blog-section">
                        <h2>Why We Do It</h2>
                        <p>
                            Bangladesh is one of the most beautiful countries in the world, but it is also one of the most
                            vulnerable to climate change. We have seen our seasons change, our summers become unbearable, and
                            our air quality drop.
                        </p>
                        <blockquote>
                            <em>"The best time to plant a tree was 20 years ago. The second best time is now."</em>
                        </blockquote>
                        <p>
                            We do this because we want our children to breathe clean air. We do this because a green city is a
                            happy city. We believe that small collective actions can lead to massive change.
                        </p>
                    </section>

                    <section className="blog-section">
                        <h2>The Impact: Benefits vs. Risks</h2>
                        <p>Why is tree planting so critical right now? Let's look at the facts.</p>

                        <div className="impact-container">
                            <div className="impact-box benefits">
                                <h3>🌿 Benefits of Planting</h3>
                                <ul className="impact-list">
                                    <li><strong>Cleaner Air:</strong> Trees absorb CO2 and release fresh Oxygen.</li>
                                    <li><strong>Temperature Control:</strong> Trees cool down the city by providing shade and moisture.</li>
                                    <li><strong>Mental Health:</strong> Green spaces reduce stress and anxiety.</li>
                                    <li><strong>Biodiversity:</strong> Provides a home for birds, bees, and squirrels.</li>
                                    <li><strong>Fruit & Medicine:</strong> A source of natural food and healing.</li>
                                </ul>
                            </div>

                            <div className="impact-box risks">
                                <h3>🔥 Risks of Not Planting</h3>
                                <ul className="impact-list">
                                    <li><strong>Heat Islands:</strong> Cities like Dhaka will become unbearably hot concrete jungles.</li>
                                    <li><strong>Air Pollution:</strong> Increase in dust and toxic gases leading to lung diseases.</li>
                                    <li><strong>Soil Erosion:</strong> Without roots to hold soil, riverbanks and lands wash away.</li>
                                    <li><strong>Flooding:</strong> Fewer trees mean less water absorption during heavy rains.</li>
                                    <li><strong>Loss of Wildlife:</strong> Extinction of native birds and insects.</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>

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

            <footer>
                <p>&copy; 2026 Green Bangladesh Club. Let's breathe freely.</p>
            </footer>
        </div>
    );
}

export default About;