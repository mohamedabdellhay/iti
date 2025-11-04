import About from "./components/About";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LatestBlog from "./components/LatestBlog";
import Products from "./components/Products/Products";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <div className="max-w-7xl mx-auto p-8">
        <Products />
      </div>

      <About />

      <div className="max-w-7xl mx-auto p-8">
        <LatestBlog />
      </div>

      <div className="max-w-7xl mx-auto p-8">
        <Footer />
      </div>
    </>
  );
}

export default App;
