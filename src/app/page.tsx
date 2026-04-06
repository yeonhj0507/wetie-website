import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Program from "@/components/Program";
import Activities from "@/components/Activities";
import Schedule from "@/components/Schedule";
import Register from "@/components/Register";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Program />
      <Activities />
      <Schedule />
      <Register />
      <Footer />
    </main>
  );
}
