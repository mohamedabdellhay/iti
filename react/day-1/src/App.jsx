// import "./App.css";
import RenderCards from "./components/Cards/RenderCrads";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MainSection from "./components/MainSection/Main";

function App() {
  return (
    <main className="container m-auto">
      <div className="">
        <Header />

        <MainSection />

        <RenderCards />

        <Footer />
      </div>
    </main>
  );
}

export default App;
