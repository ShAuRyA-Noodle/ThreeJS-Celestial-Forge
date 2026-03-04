import FlavourSlider from "../components/FlavourSlider"
import FlavourTitle from "../components/FlavourTitle"


const FlavourSection = () => {
  return (
    <section className="flavor-section">   
      <div className="h-full flex lg:flex-row flex-col items-center relative md:gap-20">
        <div className="lg:w-[60%] flex-none h-80 lg:h-full md:mt-20 xl:mt-0">
            <FlavourTitle />
        </div>
        <div className="h-full">
            <FlavourSlider />
        </div>
      </div>
    </section>
  )
}

export default FlavourSection