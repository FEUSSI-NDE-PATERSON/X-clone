import React from "react";
import { TwitterFollowButton, TwitterTweetEmbed } from "react-twitter-embed";
const tweetIds = [
  { id: "1837941993340915856" },
  { id: "1629307668568633344" },
  { id: "2233445566" },
  { id: "1628832338187636740" },
  { id: "1234567890" },
  { id: "1837820158045261956" },
  { id: "0987654321" },
];
function Ex() {
  return (
    <div className="flex-[1]">
      <div>
        {tweetIds.map((tw) => (
          <TwitterTweetEmbed tweetId={tw.id} />
        ))}
      </div>
    </div>
  );
}

export default Ex;
