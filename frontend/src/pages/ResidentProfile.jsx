// profile page and the user's posts.

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "flowbite-react";
import Post from "../components/post/Post";

const ResidentProfile = () => {
  const { userId } = useParams();
  // const [profileUser, setProfileUser] = useState(null);
  // const [posts, setPosts] = useState([]);

  const profileUser = {
    name: "John Doe",
    email: "johndoe@wingmate.com",
    profilePic: "https://xsgames.co/randomusers/avatar.php?g=male"
  };

  const posts = [
    {
      _id: "1",
      title: "Post title",
      text: "This is a post",
      media: [],
      feed: "society",
      user: {
        name: "John Doe",
        profilePic: ""
      }
    },
    {
      _id: "2",
      title: "Post title",
      text: "This is a post",
      media: [],
      feed: "society",
      user: {
        name: "John Doe",
        profilePic: ""
      }
    }
  ];


  // TODO : Fetch user profile and posts from the backend

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     const response = await fetch(`/api/users/${userId}`);
  //     const data = await response.json();
  //     setProfileUser(data);
  //   };

  //   const fetchPosts = async () => {
  //     const response = await fetch(`/api/posts/user/${userId}`);
  //     const data = await response.json();
  //     setPosts(data);
  //   };

  //   fetchProfile();
  //   fetchPosts();
  // }, [userId]);

  return (
    <div className="flex flex-col items-center gap-4">
      {profileUser && (
        <Card className="w-full lg:w-1/2 mx-auto">
          <div className="flex items-center gap-4">
            <img
              src={profileUser.profilePic}
              alt="Profile avatar"
              className="w-12 h-12 rounded-full"
            />
            <h1 className="text-xl font-semibold">{profileUser.name}</h1>
          </div>
          <p className="text-gray-500">{profileUser.email}</p>
        </Card>
      )}
      <div className="w-full lg:w-1/2 mx-auto">
        {posts.map((post) => (
          <Post key={post._id} postData={post} source="profile"/>
        ))}
      </div>
    </div>
  );
};

export default ResidentProfile;
