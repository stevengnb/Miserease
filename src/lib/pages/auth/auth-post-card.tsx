import { TbHeartHandshake } from "react-icons/tb";
import { Post } from "../../types/post-type";
import Typewriter from "typewriter-effect";

export default function AuthPostCard({ post }: { post: Post }) {
  return (
    <div className="rounded-xl bg-neutral shadow-lg p-4 m-4">
      <div className="p-4">
        <h2 className="text-xl text-accent font-semibold mb-2">
          <Typewriter
            options={{
              strings: [post.title ? post.title : "Unknown"],
              autoStart: true,
              loop: true,
              delay: 50,
            }}
          />
        </h2>
        <p className="text-gray-400">{new Date(post.postedDate!).toDateString()}</p>
        <div className="mt-4 flex items-center">
          <span className="text-xl mr-2">
            <TbHeartHandshake className="text-red-400" />
          </span>
          <span className="text-accent font-medium text-lg">{post.empathizeCount}</span>
        </div>
      </div>
    </div>
  );
}
