import {
  Code,
  ExternalLink,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Hero = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getMyProfile = async () => {
      const { data } = await axios.get(
        "https://portfolio-builder-1iu3.onrender.com/api/v1/user/me/portfolio",
        { withCredentials: true }
      );
      // console.log(data);
      setUser(data.user);
    };
    getMyProfile();
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-green-400 rounded-full h-2 w-2"></span>
        <p>Online</p>
      </div>
      <h1
        className="overflow-x-hidden text-[1.3rem] sm:text-[1.75rem] 
      md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-4"
      >
        Hey, I'm {user?.fullName}
      </h1>
      <h1
        className="text-tubeLight-effect overflow-x-hidden text-[1.3rem] 
      sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px]"
      >
        <Typewriter
          words={[
            "FULLSTACK DEVELOPER",
            "STUDENT",
            "Coder",
            "Software Developer",
          ]}
          loop={50}
          cursor
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>
      <div
        className="w-fit px-5 py-2 bg-slate-50 rounded-[20px] flex gap-5 
      items-center mt-4 md:mt-8 lg:mt-10"
      >
        <Link to={user.linkedInURL} target="_blank">
          <Linkedin className="text-sky-500 w-7 h-7" />
        </Link>
        <Link to={user.githubURL} target="_blank">
          <Github className="text-blue-800 w-7 h-7" />
        </Link>
        <Link to={user.instagramURL} target="_blank">
          <Instagram className="text-pink-500 w-7 h-7" />
        </Link>
        <Link to="https://x.com/RajatKumarDabas" target="_blank">
          <Twitter className="text-blue-800 w-7 h-7" />
        </Link>
      </div>
      <div className="mt-4 md:mt-8 lg:mt-10  flex gap-3">
        <Link to={user.resume && user.resume.url} target="_blank">
          <Button className="rounded-[30px] flex items-center gap-2 flex-row">
            <span>
              <ExternalLink />
            </span>
            <span>Resume </span>
          </Button>
        </Link>
        <Link to={user.leetcodeURL} target="_blank">
          <Button className="rounded-[30px] flex items-center gap-2 flex-row">
            <span>
              <Code />
            </span>
            <span>Leetcode</span>
          </Button>
        </Link>
        <Link to={user.gfgURL} target="_blank">
          <Button className="rounded-[30px] flex items-center gap-2 flex-row">
            <span>
              <Code />
            </span>
            <span>GFG</span>
          </Button>
        </Link>
        <Link to={user.codeforcesURL} target="_blank">
          <Button className="rounded-[30px] flex items-center gap-2 flex-row">
            <span>
              <Code />
            </span>
            <span>Codeforces</span>
          </Button>
        </Link>
        <Link to={user.codechefURL} target="_blank">
          <Button className="rounded-[30px] flex items-center gap-2 flex-row">
            <span>
              <Code />
            </span>
            <span>Codechef</span>
          </Button>
        </Link>

        <Link to="http://localhost:5174/" target="_blank">
          <Button className="rounded-[30px] flex items-center gap-2 flex-row">
            <span>
              <ExternalLink />
            </span>
            <span>Go To Dashboard </span>
          </Button>
        </Link>
      </div>
      <hr className="my-8 md::my-10 " />
    </div>
  );
};

export default Hero;
