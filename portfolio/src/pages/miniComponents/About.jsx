import React, { useEffect, useState } from "react";
import axios from "axios";

const About = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getMyProfile = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/me/portfolio",
        { withCredentials: true }
      );
      setUser(data.user);
    };
    getMyProfile();
  }, []);

  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      <div className="relative">
        <h1
          className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
          lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold "
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          ABOUT <span className="text-tubeLight-effect font-extrabold">ME</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      <div className="text-center">
        <p className="uppercase text-xl text-slate-400">
          Allow me to introduce myself.
        </p>
      </div>
      <div>
        <div className="grid md:grid-cols-2 my-8 sm:my-20 gap-14">
          <div className="flex justify-center items-center">
            <img
              src={user?.avatar && user?.avatar.url}
              alt={user.fullName}
              className="bg-white p-2 sm:p-4 rotate-[25deg] h-[240px] sm:h-[340px] md:h-[350px] lg:h-[450px]"
            />
          </div>
          <div className="flex justify-center flex-col tracking-[1px] text-xl gap-5">
            <p>
              I am a Computer Engineering(COE) student at Delhi Technological
              University(DTU), with a strong academic record and a CGPA of 8.28.
              Proficient in C/C++, Python, JavaScript, and various web
              development frameworks like ReactJS, MongoDB, and NodeJS.
            </p>
            <p>
              I have demonstrated my skills through impactful internships and
              academic projects.
            </p>
          </div>
        </div>
        <p className="tracking-[1px] text-xl">
          I also excell in problem-solving with a high LeetCode rating of 1828 and 950+
          problems solved and achieved top ranks in JEE Mains and Jee Advanced.
          I am committed to continuous learning and contributing to
          technological advancements. periods.
        </p>
      </div>
    </div>
  );
};

export default About;
