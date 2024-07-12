import { Post } from "../lib/types/post-type";
import { TbHeartHandshake } from "react-icons/tb";
import { truncateContent } from "../lib/utils/string-util";



export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="rounded-xl bg-neutral shadow-lg p-4">
      <div className="p-2 lg:p-4">
        <h2 className="text-xl text-accent font-semibold mb-2">{post.title}</h2>
        <p className="text-sm lg:text-base text-gray-400">{new Date(post.postedDate!).toDateString()}</p>
        <p className="text-sm lg:text-base text-accent mt-2">
          {truncateContent(post.content || "", 10)}
        </p>
        <div className="mt-4 flex items-center">
          <span className="text-xl mr-2">
            <TbHeartHandshake className="text-red-400"/>
          </span>
          <span className="text-accent font-medium text-lg">{post.empathizeCount}</span>
        </div>
      </div>
    </div>
  );
}