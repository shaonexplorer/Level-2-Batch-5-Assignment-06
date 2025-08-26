import { Casestudies } from "@/components/home/casestudies";
import { Cta } from "@/components/home/cta";
import { Feature } from "@/components/home/feature";
import { Hero } from "@/components/home/hero";

function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Cta />
      <Feature />
      <Casestudies />
    </div>
  );
}

export default HomePage;
