import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Section from "./components/Section/Section";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Hero />
      <Section
  title="Top Albums"
  endpoint="https://qtify-backend.labs.crio.do/albums/top"
/>
<Section
  title="New Albums"
  endpoint="https://qtify-backend.labs.crio.do/albums/new"
/>
    </BrowserRouter>
  );
}

export default App;