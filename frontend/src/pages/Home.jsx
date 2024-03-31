// home page using tailwind and flowbite-react which will have to tabs one for society feed and other for wing feed

import React from "react";
import { Card, Tabs } from "flowbite-react";
import SocietyFeed from "../components/society/SocietyFeed";
import PostForm from "../components/post/PostForm";

const Home = () => {

  return (
    <div className="container mx-auto">
      <div className="w-full">
        <PostForm />
        <SocietyFeed/>
      </div>
    </div>
    // <h1>Home page</h1>
  );
};

export default Home;
