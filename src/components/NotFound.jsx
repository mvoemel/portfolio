import { Link } from "react-router-dom";
import { styles } from "../styles";
import { BackgroundBeams } from "./BackgroundBeams";

const NotFound = () => {
  return (
    <div className="bg-primary relative w-full h-screen mx-auto">
      <BackgroundBeams />
      {/* CONTAINER */}
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        {/* LINE WITH DOT */}
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        {/* TITLE WITH DESCRIPTION */}
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            404 <span className="text-[#915EFF]">Not Found</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white`}>
            The resource you have requested does not exist.
          </p>
          <Link to="/" className={`${styles.heroSubText} mt-2 text-white`}>
            <span className="text-[#915EFF]">Back to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
