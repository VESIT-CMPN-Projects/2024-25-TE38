import TeamCard from "./Card/TeamCard";
import BlueLandingText from "./Text/BlueLandingText";

export default function TeamSection() {
  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <div className="w-auto px-4">
        <BlueLandingText text={"Team"} />
      </div>
      <div className="w-full">
        <TeamCard
          name={"Latish Adwani"}
          linkedIn={"https://www.linkedin.com/in/latish705/"}
          image="/assets/Landing/Team/latish_profile.png"
          info="software Developer"
        />
      </div>
    </div>
  );
}
