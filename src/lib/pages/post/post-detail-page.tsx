import { Post } from "../../types/post-type";
import MainLayout from "../layout/main-layout";
import { useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { formatDate } from "../../services/formatter-service";
import { TbHeartHandshake } from "react-icons/tb";

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();

  const Back = () => {};

  const post: Post = {
    postID: "adslfkajsldfjkasldfkjs",
    posterID: "lskjdslfjdslfkjasdf",
    title: "Hackathon day 1 udah di contek :(",
    content:
      "Pada jam 18.28 pada saat saya membahas dengan teman saya, ada orang yang lewat mencontek ide kita huhu",
    postedDate: new Date(Date.now()),
    category: ["School", "Personal"],
    resolved: false,
    resolvedComment: "",
    emphatizeCount: 232,
    archived: false,
    banned: false,
  };
  return (
    <MainLayout>
      <div className="mx-12">
        <div className="w-max h-max flex">
          <button
            onClick={Back}
            className="bg-secondary text-accent rounded-xl p-3 text-xl h-12 w-min"
          >
            <IoMdArrowRoundBack />
          </button>
          <span className="text-accent rounded-xl p-3 text-lg h-12 w-max">
            The unfolded story
          </span>
        </div>
        <div className="p-6 font-mono">
          <div className="text-accent font-semibold text-3xl">
            <p>{post.title}</p>
          </div>
          <div className="font-thin text-base">
            <div className="">
              <span className="text-gray-400">
                Posted on{" "}
                <span className="text-gray-300">
                  {post.postedDate === undefined
                    ? "n.d."
                    : formatDate(post.postedDate)}
                </span>
              </span>
            </div>
            <div className="">
              <span className="text-xl flex items-center text-empathy">
                <TbHeartHandshake />
                <span className="text-gray-400 text-base pl-1">
                  {post.emphatizeCount}{" "}
                  <span className="text-gray-300">Emphatizer</span>
                </span>
              </span>
            </div>
            <div className="mt-6">
              <span className="text-base text-gray-400">
                This story is about{" "}
                <span className="text-gray-300">
                  {post.category?.join(", ")}
                </span>
              </span>
            </div>
            <div className="text-accent text-lg mt-6">{post.content}</div>
          </div>
          <div className="mt-4">
            <button className="flex justify-center items-center gap-2 tracking-wide rounded-3xl bg-accent text-neutral font-bold p-3 px-8 text-base hover:bg-neutral hover:text-accent transition-all duration-300 ease-in-out">
              <TbHeartHandshake className="text-xl" />
              Emphatize
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
