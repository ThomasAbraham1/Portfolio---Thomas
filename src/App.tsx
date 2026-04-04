import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import TrackPageViews from './components/TrackPageViews';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import Services from './pages/Services';
import Testimonials from './pages/Testimonials';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import UnderConstruction from './pages/UnderConstruction';

function App() {
  return (
    <Router>
      <TrackPageViews />
      <Routes>
        <Route path="/" element={<UnderConstruction />} />
        <Route path="/thomas/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/work" element={<Work />} />
              <Route path="/services" element={<Services />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Layout>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
