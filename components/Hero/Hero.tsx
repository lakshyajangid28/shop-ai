import HeroTag from "./HeroTag";
import HeroTitle from "./HeroTitle";
import HeroCTAButtons from "./HeroCTAButtons";
import HeroStats from "./HeroStats";
import HeroVisual from "./HeroVisual";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <HeroTag />
            <HeroTitle />
            <HeroCTAButtons />
            <HeroStats />
          </div>

          {/* Right Visual */}
          <HeroVisual />
        </div>
      </div>
    </section>
  );
};

export default Hero;
