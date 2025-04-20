export default function BlueLandingText({ text }: any) {
  const words = typeof text === "string" ? text.split(" ") : [];

  const line1 = words.slice(0, Math.ceil(words.length / 2)).join(" ");
  const line2 = words.slice(Math.ceil(words.length / 2)).join(" ");

  return (
    <div className="">
      {words.length > 1 ? (
        <>
          <div className="bg-light_primary_background px-4  rounded-lg text-center">
            {line1}
          </div>
          <div className="bg-light_primary_background px-4  rounded-lg text-center">
            {line2}
          </div>
        </>
      ) : (
        <div className="bg-light_primary_background px-2 py-2 rounded-lg text-center font-bold text-2xl">
          {text}
        </div>
      )}
    </div>
  );
}
