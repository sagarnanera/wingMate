// post card

// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PropTypes from "prop-types";

import { formateDate } from "../../utils/formateDate";

const PostCard = ({ postData }) => {
  return (
    <>
      <div className="flex items-center">
        <img
          loading="lazy"
          src="https://xsgames.co/randomusers/avatar.php?g=pixel"
          alt="user"
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-4">
          <Link className="block text-sm" to={`/residents/${123}`}>
            {postData?.user?.name}
          </Link>
          <span className="block text-xs text-gray-500">
            {formateDate(postData?.createdOn)}
          </span>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold mt-4">{postData.title}</h2>
        {/* image post */}
        {postData &&
          postData.contentType &&
          postData.contentType === "image" &&
          (postData.media && postData.media.length > 1 ? (
            <Carousel
              showThumbs={false}
              showStatus={false}
              showArrows={true}
              infiniteLoop={true}
              autoPlay={true}
            >
              {postData.media.map((image, index) => (
                <img
                  loading="lazy"
                  key={index}
                  src={image}
                  alt="post"
                  className="w-full rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "fallback-image-url";
                  }}
                />
              ))}
            </Carousel>
          ) : (
            <div className="mt-4">
              <img
                loading="lazy"
                src={postData.media[0]}
                alt="post"
                className="w-full rounded-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "fallback-image-url";
                }}
              />
            </div>
          ))}
        {/* gif post */}
        {postData && postData.contentType && postData.contentType === "gif" && (
          <div className="mt-4">
            <img
              loading="lazy"
              src={postData.media[0]}
              alt="post"
              className="w-full rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "fallback-image-url";
              }}
            />
          </div>
        )}
        {/* video post */}
        {postData &&
          postData.contentType &&
          postData.contentType === "video" && (
            <div className="mt-4">
              <video
                src={postData.media[0]}
                controls
                controlsList="nodownload"
                className="w-full rounded-lg"
              />
            </div>
          )}

        {postData &&
          postData.contentType &&
          postData.contentType === "text" && (
            <p className="text-sm mt-4">{postData.text}</p>
          )}
      </div>
    </>
  );
};

PostCard.propTypes = {
  postData: PropTypes.object.isRequired,
  source: PropTypes.string,
};

export default PostCard;
