import React from "react";
import BlogCard from "./BlogCard";
const latestPost = [1, 2, 3];
export default function LatestBlog() {
  return (
    <div>
      <h3 className="text-center font-bold text-3xl">Latest Blog</h3>
      <div className="grid grid-cols-3 gap-3">
        {latestPost.map((ele) => (
          <BlogCard key={ele} />
        ))}
      </div>
    </div>
  );
}
