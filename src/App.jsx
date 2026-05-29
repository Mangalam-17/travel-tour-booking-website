import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop, { ScrollRestoration } from './components/ScrollToTop/ScrollToTop';
import Home from './pages/Home/Home';
import Destinations from './pages/Destinations/Destinations';
import TourDetails from './pages/TourDetails/TourDetails';
import Booking from './pages/Booking/Booking';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';

function App() {
  return (
    <BrowserRouter>
      <ScrollRestoration />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/tour/:id" element={<TourDetails />} />
              <Route path="/booking/:id" element={<Booking />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center pt-20">
                  <div className="text-center">
                    <div className="text-8xl font-bold text-orange-500 mb-4">404</div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Page Not Found</h2>
                    <p className="text-slate-500 mb-6">The page you're looking for doesn't exist.</p>
                    <a href="/" className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors">
                      Go Home
                    </a>
                  </div>
                </div>
              } />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </BrowserRouter>
  );
}

export default App;
