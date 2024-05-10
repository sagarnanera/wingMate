// society feed component which will have all the posts from the society + wing feed

import React, { useEffect, useState } from "react";
import { Button, Card } from "flowbite-react";
import Post from "../post/Post";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../utils/showToast";
import { getPostsAction } from "../../actions/postAction";
import { useLocation } from "react-router-dom";
import Loader from "../shared/Loader";

const SocietyFeed = () => {
  const location = useLocation().pathname;

  const dispatch = useDispatch();

  useEffect(() => {
    const filter = {};

    if (location === "/") {
      Object.assign(filter, { feed: "society" });
    }

    if (location === "/wing-feed") {
      Object.assign(filter, { feed: "wing" });
    }

    dispatch(getPostsAction(filter));
  }, [dispatch, location]);

  const { posts, error, loading } = useSelector((state) => state.post);

  if (loading) {
    console.log("loading");
    return (
      <Card className="w-full h-full flex justify-center items-center p-4 mt-4">
        <Loader size={"2xl"} />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full flex justify-center items-center p-4 mt-4">
        <h1 className="text-2xl font-semibold text-gray-800 my-4 justify-center text-center">
          Error fetching Posts
        </h1>
        <Button className="" onClick={() => window.location.reload()}>
          {" "}
          Refresh page
        </Button>
      </Card>
    );
  }

  return (
    <>
      <div className="flex flex-col flex-wrap items-center justify-center">
        {posts.length === 0 ? (
          <Card className={`w-full lg:w-1/2 mt-4`}>
            <h1 className="text-2xl font-semibold text-gray-800 my-4 justify-center text-center">
              No posts available
            </h1>
          </Card>
        ) : (
          posts.map((post) => <Post postData={post} key={post._id} />)
        )}
      </div>
    </>
  );
};

export default SocietyFeed;
