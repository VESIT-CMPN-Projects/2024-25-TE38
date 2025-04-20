import ServiceCard from "./Card/ServiceCard";
import BlueLandingText from "./Text/BlueLandingText";
import WhiteLandingText from "./Text/WhiteLandingText";

export default function Services() {
  return (
    <div className="flex flex-col w-full items-center gap-8">
      <div className="text-center flex flex-col lg:flex-row items-center gap-2 xl:gap-8">
        <div className="w-auto">
          <BlueLandingText text={"Services"} />
        </div>
        <p className="mt-4 lg:mt-0 text-gray-600 dark:text-white">
          At our digital marketing agency, we offer a range of services to help
          businesses grow and succeed online. These services include:
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full  justify-between">
        <ServiceCard
          bgColor={"bg-light_secondary_background"}
          text={<BlueLandingText text={"Placement Analytics"} />}
          link={"/"}
          image={"assets/Landing/Card1.svg"}
        />
        <ServiceCard
          bgColor={"bg-light_primary_background"}
          text={<WhiteLandingText text={"Role-based Access"} />}
          link={"/"}
          image={"assets/Landing/Card1.svg"}
        />
        <ServiceCard
          bgColor={"bg-dark_bg_card"}
          text={<WhiteLandingText text={"Student Profile Management"} />}
          link={"/"}
          image={"assets/Landing/Card1.svg"}
        />
        <ServiceCard
          bgColor={"bg-light_secondary_background"}
          text={<BlueLandingText text={"Application Tracking"} />}
          link={"/"}
          image={"assets/Landing/Card1.svg"}
        />
        <ServiceCard
          bgColor={"bg-light_primary_background"}
          text={<WhiteLandingText text={"Resume Verification"} />}
          link={"/"}
          image={"assets/Landing/Card1.svg"}
        />
        <ServiceCard
          bgColor={"bg-dark_bg_card"}
          text={<WhiteLandingText text={"Custom Filters"} />}
          link={"/"}
          image={"assets/Landing/Card1.svg"}
        />
      </div>
    </div>
  );
}
