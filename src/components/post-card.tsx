import { Post } from "../lib/types/post-type";
import { TbHeartHandshake } from "react-icons/tb";
import { formatDate } from "../lib/services/formatter-service";
import { truncateContent } from "../lib/utils/string-util";

export default function PostCard({ post }: { post: Post }) {
  const txtColor = post.resolved ? "text-primary" : "text-accent";
  console.log(post)
  return (
    <div
      className={
        post.resolved
          ? "rounded-xl border-4 bg-accent  shadow-lg p-4"
          : "rounded-xl bg-neutral shadow-lg p-4"
      }
    >
      <div className="p-2 lg:p-4">
        <h2 className={`${txtColor} text-xl text-accent font-semibold mb-2`}>
          {post.title}
        </h2>
        <p className="text-sm lg:text-base text-gray-400">
          {post.postedDate === undefined ? "n.d." : formatDate(post.postedDate)}
        </p>
        <p className={`text-sm lg:text-base text-accent mt-2 ${txtColor}`}>
          {truncateContent(post.content)}
        </p>
        <div className="mt-4 flex items-center">
          <span className="text-xl mr-2">
            <TbHeartHandshake className="text-red-400" />
          </span>
          <span className={`${txtColor} text-accent font-medium text-lg`}>
            {post.empathizeCount}
          </span>
        </div>
      </div>
    </div>
  );
}
