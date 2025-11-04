import SectionContent from "./SectionContent";
import SectionImage from "./SectionImage";

export default function Hero() {
  return (
    <div
      style={
        {
          // background: "#eee",
        }
      }
    >
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="max-w-7xl mx-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <SectionContent
              title={"for all your furniture needs"}
              desc={
                " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi nostrum ullam praesentium impedit nihil, consectetur dignissimos ea consequatur ipsa harum architecto, explicabo possimus molestias quaerat eos ipsum non pariatur facere."
              }
              Buttons={
                <>
                  <button className="bg-[#d8971f] text-white font-semibold px-12 py-3  00">
                    Click
                  </button>
                  <button className="bg-[#79bb69] text-gray-800 font-semibold px-12 py-3 ">
                    Start
                  </button>
                </>
              }
            />
            <SectionImage img={"about-img.png"} />
          </div>
        </div>
      </div>
    </div>
  );
}
