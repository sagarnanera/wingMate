// home page using tailwind and flowbite-react which will have to tabs one for society feed and other for wing feed

import React from "react";
import { Card, Tabs } from "flowbite-react";
import SocietyFeed from "../components/society/SocietyFeed";
import PostForm from "../components/post/PostForm";
import { useLocation } from "react-router-dom";

const Home = () => {
  const feedTab = useLocation().pathname;

  return (
    <div className="container mx-auto">
      <div className="w-full">
        <PostForm />
        <SocietyFeed />
        {/* {feedTab === "/" ? <SocietyFeed /> : <h1>wingFeed</h1>} */}
      </div>
    </div>
  );
};

export default Home;
