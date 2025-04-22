import { Search } from "@mui/icons-material";
import { Input } from "@mui/material";
import React from "react";
import { Tweet } from "react-tweet";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from "react-twitter-embed";
const tweetIds = [
  { id: "1628832338187636740" },
  { id: "1629307668568633344" },
  { id: "1234567890" },
  { id: "0987654321" },
  { id: "2233445566" },
  { id: "1837941993340915856" },
  { id: "1837820158045261956" },
];

function Tweets() {
  return (
    <div className="text-white flex-[0.8] hidden sm:block  p-5">
      <div className="sticky bg-[#202327] hidden   text-[#6C7075] sm:p-2 sm:flex outline-none rounded-full items-center">
        <Search />
        <input
          type="search"
          className="bg-transparent text-white p-1 flex-1 ml-5 outline-none placeholder:text-[#6C7075] "
          placeholder="search"
        />
      </div>
      <div className="flex flex-col p-5 border-[1px] rounded-lg mt-8 border-gray-500">
        <h2 className="text-[#E7E9EA] text-2xl font-bold my-2">
          Subscribe to Premium
        </h2>
        <p className="text-[#DEE0E1]">
          Subscribe to Unlock new features and if eligible,receive a share of
          ads revenue
        </p>
        <button className="text-white bg-[#1D9BF0] font-extrabold  p-3 rounded-full  my-3 animate-pulse mn">
          Subscribe
        </button>
      </div>
      <div>
        <h2>Trends for you</h2>
        <div>
          {tweetIds.map((tw) => (
            <TwitterTweetEmbed tweetId={tw.id} />
          ))}
          <TwitterFollowButton screenName={"elonMusk"} />
          <TwitterFollowButton screenName={"Potus"} />
          <TwitterFollowButton screenName={"Un"} />
          <TwitterFollowButton screenName={"KremlinRussia_E"} />
        </div>
      </div>
    </div>
  );
}

export default Tweets;
