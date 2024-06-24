import { Header } from "../../components/Header";
import { Cards } from "../../components/Cards";
import { ScoreBox } from "../../components/ScoreBox";

const Home = () => {
  return (
    <div className="flex-col  sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Header />
      <ScoreBox />
      <Cards />
    </div>
  );
};
export default Home;
