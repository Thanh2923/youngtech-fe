
import Carousels from "../components/carousel/Carousel";
import { MainHome } from "../components/MainHome";



export default function Home() {
  return (
    <>
    <div className="w-full banner">
      <Carousels/>
    </div>
     <div className="w-[90%] m-auto"> 
     <MainHome/>
     </div>
    </>
  );
}
