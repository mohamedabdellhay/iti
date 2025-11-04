import React from "react";
import SectionImage from "./SectionImage";
import SectionContent from "./SectionContent";
export default function About() {
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
            <SectionImage img={"slider-img.png"} />
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
                </>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
