import { HeroSlide } from "../_component/HeroSlide";

export const HeroSection = () => {
  return (
    <div className="overflow-x-scroll w-full h-[600px] relative">
      <div className="flex w-fit h-full">
        <HeroSlide
          src="Wicked.jpeg"
          name={`Wicked`}
          text={`Elphaba, a misunderstood young woman because of her green skin, and
          Glinda, a popular girl, become friends at Shiz University in the Land
          of Oz. After an encounter with the Wonderful Wizard of Oz, their
          friendship reaches a crossroads.`}
        />
        <HeroSlide
          src="Gladiator.jpg"
          name={`Gladiator II`}
          text={`After his home is conquered by the tyrannical emperors who now
              lead Rome, Lucius is forced to enter the Colosseum and must look
              to his past to find strength to return the glory of Rome to its
              people.`}
        />
        <HeroSlide
          src="Moano.jpg"
          name={`Moana 2`}
          text={`After receiving an unexpected call from her wayfinding ancestors,
              Moana must journey to the far seas of Oceania and into dangerous,
              long-lost waters for an adventure unlike anything she's ever
              faced.`}
        />
      </div>
    </div>
  );
};
