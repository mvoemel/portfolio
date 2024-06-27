"use client";

import React from "react";

import { companies, testimonials } from "@/data";
import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";

const Clients = () => {
  return (
    <section className="py-20" id="testimonials">
      {/* TODO: implement testimonials section */}
      {/* <h1 className="heading">
        Kind words from
        <span className="text-purple"> satisfied clients</span>
      </h1> */}
      <div className="flex flex-col items-center max-lg:mt-10">
        {/* <div
          // remove bg-white dark:bg-black dark:bg-grid-white/[0.05], h-[40rem] to 30rem , md:h-[30rem] are for the responsive design
          className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden"
        >
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div> */}

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg:mt-10">
          {companies.map((company) => (
            <React.Fragment key={company.id}>
              <div className="flex md:max-w-80 max-w-32 gap-2 items-center">
                <img
                  src={company.img}
                  alt={company.name}
                  className="md:w-12 w-5"
                />
                <h2 className="md:text-2xl text-lg font-semibold">
                  {company.name}
                </h2>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
