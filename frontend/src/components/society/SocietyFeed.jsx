// society feed component which will have all the posts from the society + wing feed

import React from "react";
import { Card } from "flowbite-react";
import Post from "../post/Post";

const SocietyFeed = () => {
  const posts = [
    {
      _id: "80c85af2-a8fb-4dda-a452-4ef7474f3dea",
      userId: "3e662ac7-1b59-48d2-bd9e-1b7281694ef1",
      societyId: "8426a679-6a38-416a-a6d8-4e9ccadb8744",
      wingId: "4918bf3b-f89b-4a57-a78b-064e29123875",
      title: "this is carousel post",
      totalLikes: 1,
      totalComments: 5,
      feed: "wing",
      postType: "normal post",
      contentType: "image",
      createdOn: "2023-02-22T12:55:39.384Z",
      media: [
        "https://xsgames.co/randomusers/avatar.php?g=pixel",
        "https://xsgames.co/randomusers/avatar.php?g=pixel",
        "https://xsgames.co/randomusers/avatar.php?g=pixel",
        "https://xsgames.co/randomusers/avatar.php?g=pixel",
      ],
      fbPostId: "736565938641283",
      user: {
        name: "tony stark",
        role: "resident",
      },
      fbPostURL: "https://facebook.com/736565938641283",
    },
    {
      _id: "80c85af2-a8fb-4dda-a452-4ef7474f3dec",
      userId: "3e662ac7-1b59-48d2-bd9e-1b7281694ef1",
      societyId: "8426a679-6a38-416a-a6d8-4e9ccadb8744",
      wingId: "4918bf3b-f89b-4a57-a78b-064e29123875",
      title: "this is single image post",
      totalLikes: 1,
      totalComments: 5,
      feed: "wing",
      postType: "normal post",
      contentType: "image",
      createdOn: "2024-02-22T12:55:39.384Z",
      media: ["https://xsgames.co/randomusers/avatar.php?g=female"],
      fbPostId: "736565938641283",
      user: {
        name: "steve rogers",
        role: "resident",
      },
      fbPostURL: "https://facebook.com/736565938641283",
    },
    {
      _id: "80c85af2-a8fb-4dda-a452-4ef7474f3deb",
      userId: "3e662ac7-1b59-48d2-bd9e-1b7281694ef1",
      societyId: "8426a679-6a38-416a-a6d8-4e9ccadb8744",
      wingId: "4918bf3b-f89b-4a57-a78b-064e29123875",
      title: "this is a video post",
      totalLikes: 1,
      totalComments: 5,
      feed: "wing",
      postType: "normal post",
      contentType: "video",
      createdOn: "2024-02-22T12:55:39.384Z",
      media: ["https://www.w3schools.com/html/mov_bbb.mp4"],
      fbPostId: "736565938641283",
      user: {
        name: "bruce banner",
        role: "resident",
      },
      fbPostURL: "https://facebook.com/736565938641283",
    },
    {
      _id: "80c85af2-a8fb-4dda-a452-4ef7474f3dev",
      userId: "3e662ac7-1b59-48d2-bd9e-1b7281694ef1",
      societyId: "8426a679-6a38-416a-a6d8-4e9ccadb8744",
      wingId: "4918bf3b-f89b-4a57-a78b-064e29123875",
      title: "this is a gif post",
      totalLikes: 1,
      totalComments: 5,
      feed: "wing",
      postType: "normal post",
      contentType: "gif",
      createdOn: "2024-02-22T12:55:39.384Z",
      media: ["https://media.giphy.com/media/3o7TKz9bX9W9h3wMlK/giphy.gif"],
      fbPostId: "736565938641283",
      user: {
        name: "natasha romanoff",
        role: "resident",
      },
      fbPostURL: "https://facebook.com/736565938641283",
    },
    {
      _id: "80c85af2-a8fb-4dda-a452-4ef7474f3dex",
      userId: "3e662ac7-1b59-48d2-bd9e-1b7281694ef1",
      societyId: "8426a679-6a38-416a-a6d8-4e9ccadb8744",
      wingId: "4918bf3b-f89b-4a57-a78b-064e29123875",
      title: "this is a text post",
      totalLikes: 1,
      totalComments: 5,
      feed: "wing",
      postType: "normal post",
      contentType: "text",
      createdOn: "2024-02-22T12:55:39.384Z",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      fbPostId: "736565938641283",
      user: {
        name: "peter parker",
        role: "resident",
      },
      fbPostURL: "https://facebook.com/736565938641283",
    },
  ];
  return (
    <>
      <div className="flex flex-col flex-wrap items-center justify-center">
        {posts &&
          posts.length &&
          posts.map((post) => <Post postData={post} key={post._id} />)}
      </div>
    </>
  );
};

export default SocietyFeed;
