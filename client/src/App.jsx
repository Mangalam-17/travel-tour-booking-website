import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop, { ScrollRestoration } from './components/ScrollToTop/ScrollToTop';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute/ProtectedRoute';
import Home from './pages/Home/Home';
import Destinations from './pages/Destinations/Destinations';
import TourDetails from './pages/TourDetails/TourDetails';
import Booking from './pages/Booking/Booking';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminBookings from './pages/Admin/AdminBookings';
import AdminContacts from './pages/Admin/AdminContacts';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminTours from './pages/Admin/AdminTours';
import AdminTourForm from './pages/Admin/AdminTourForm';
import AdminHeroSlides from './pages/Admin/AdminHeroSlides';

// Wrapper that adds Navbar + Footer for public pages
const PublicLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
    <ScrollToTop />
  </div>
);

// Inner component so useLocation works inside BrowserRouter
const AppRoutes = () => {
  const location = useLocation();

  return (
    <>
      <ScrollRestoration />
      <Routes>
        {/* Admin routes — full-screen, no Navbar/Footer */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="tours" element={<AdminTours />} />
          <Route path="tours/new" element={<AdminTourForm />} />
          <Route path="tours/:id/edit" element={<AdminTourForm />} />
          <Route path="hero-slides" element={<AdminHeroSlides />} />
        </Route>

        {/* Public routes — with Navbar/Footer */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <AnimatePresence mode="wait" key={location.pathname}>
                <Home />
              </AnimatePresence>
            </PublicLayout>
          }
        />
        <Route
          path="/destinations"
          element={
            <PublicLayout>
              <Destinations />
            </PublicLayout>
          }
        />
        <Route
          path="/tour/:id"
          element={
            <PublicLayout>
              <TourDetails />
            </PublicLayout>
          }
        />
        <Route
          path="/booking/:id"
          element={
            <PublicLayout>
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />
        <Route
          path="/login"
          element={
            <PublicLayout>
              <Login />
            </PublicLayout>
          }
        />
        <Route
          path="/register"
          element={
            <PublicLayout>
              <Register />
            </PublicLayout>
          }
        />
        <Route
          path="*"
          element={
            <PublicLayout>
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
            </PublicLayout>
          }
        />
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
