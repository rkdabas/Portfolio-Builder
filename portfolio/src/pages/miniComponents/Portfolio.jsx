import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const getMyProjects = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/project/getall",
        { withCredentials: true }
      );
      // console.log(data);
      setProjects(data.projects);
    };
    getMyProjects();
  }, []);
  return (
    <div>
      <div className="relative mb-12">
        <h1
          className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] 
          mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          MY{" "}
          <span className="text-tubeLight-effect font-extrabold">PROJECTS</span>
        </h1>
        <h1
          className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] 
          mx-auto w-fit font-bold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          Click on them
        </h1>
        {/* when display size is small like phone screen then show "My Work" instead of "My Projects" */}
        <h1
          className="flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
          tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          MY <span className="text-tubeLight-effect font-extrabold">WORK</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {viewAll
          ? projects &&
            projects.map((element) => {
              return (
                <Card
                  className="h-fit p-7 flex flex-col justify-center items-center gap-3"
                  key={element._id}
                >
                  <Link to={`/project/${element._id}`} key={element._id}>
                    <img
                      src={element.projectBanner && element.projectBanner.url}
                      alt="project"
                      className="h-12 sm:h-24 w-auto"
                    />
                    <p className="text-muted-foreground text-center">
                      {element.title}
                    </p>
                  </Link>
                </Card>
              );
            })
          : projects &&
            projects.slice(0, 9).map((element) => {
              return (
                <Card
                  className="h-fit p-7 flex flex-col justify-center items-center gap-3"
                  key={element._id}
                >
                  <Link to={`/project/${element._id}`} key={element._id}>
                    <img
                      src={element.projectBanner && element.projectBanner.url}
                      alt="project"
                      className="h-12 sm:h-24 w-auto"
                    />
                    <p className="text-muted-foreground text-center">
                      {element.title}
                    </p>
                  </Link>
                </Card>
              );
            })}
      </div>
      {/* if projects length is greater than 9 then show the "show more" button */}
      {projects && projects.length > 9 && (
        <div className="w-full text-center my-9">
          <Button className="w-52" onClick={() => setViewAll(!viewAll)}>
            {viewAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
