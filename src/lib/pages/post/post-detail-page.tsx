import { Post } from "../../types/post-type";
import MainLayout from "../layout/main-layout";
import { useParams } from "react-router-dom";
import { formatDate } from "../../services/formatter-service";
import { TbHeartHandshake } from "react-icons/tb";
import BackButton from "../../../components/back-button";
import { getPostById } from "../../services/post-service";
import { useEffect, useState } from "react";
import { isEmptyId } from "../../utils/validate-util";
import Loader from "../../../components/loader";

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function FunctionButton({
    icon = <TbHeartHandshake className="w-6 h-6" />,
    onClick = () => {},
  }) {
    const [hide, setHide] = useState(true);

    return (
      <button
        onMouseOver={() => {
          setHide(false);
        }}
        onMouseOut={() => {
          setHide(true);
        }}
        className="w-max rounded-full p-2 bg-accent text-neutral flex items-center justify-center transition-all duration-300 shadow-xl"
        onClick={onClick}
      >
        {icon}
        <span className={`ml-2 ${hide ? "hidden" : "block"}`}>Emphatize</span>
      </button>
    );
  }

  // const post: Post = {
  //   postID: "adslfkajsldfjkasldfkjs",
  //   posterID: "lskjdslfjdslfkjasdf",
  //   title: "Hackathon day 1 udah di contek :(",
  //   content:
  //     "Pada jam 18.28 pada saat saya membahas dengan teman saya, ada orang yang lewat mencontek ide kita huhu",
  //   postedDate: new Date(Date.now()),
  //   category: ["School", "Personal"],
  //   resolved: false,
  //   resolvedComment: "",
  //   empathizeCount: 232,
  //   archived: false,
  //   banned: false,
  // };

  const fetchPost = async (postId: string) => {
    setLoading(true);
    try {
      const response = await getPostById(postId);
      if (response.success) {
        if (response.data) {
          console.log("Set postnya");
          console.log("datae = ", response.data);
          setPost(response.data);
        } else {
          setError("Failed to retrieve post!");
        }
      } else {
        setError("Failed to retrieve post!");
      }
    } catch (error) {
      setError("Failed to retrieve post!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPost(id as string);
    }
  }, [id]);

  return (
    <MainLayout>
      <div className="mx-12 text-accent">
        {loading ? (
          <div className="justify-center flex col-span-3">
            <Loader />
          </div>
        ) : error ? (
          <div>{error}</div>
        ) : post ? (
          <>
            <div className="w-max h-max flex relative items-center">
              <BackButton isDetail={true} />
              <span className="text-accent rounded-xl p-3 text-lg h-12 w-max pl-8">
                The unfolded story
              </span>
            </div>
            <div className="p-6 h-auto font-mono">
              <div className="flex justify-between">
                <div className="text-accent font-semibold text-3xl">
                  <p>{post.title}</p>
                </div>
                <div className="bg-neutral text-sm font-thin px-6 py-3 rounded-3xl">
                  <div>{post.resolved ? "Resolved" : "Unresolved"}</div>
                </div>
              </div>
              <div className="font-thin text-base flex flex-col pb-7">
                <div className="">
                  <span className="text-gray-400">
                    <span className="text-gray-300">
                      {post.postedDate === undefined
                        ? "n.d."
                        : formatDate(post.postedDate)}
                    </span>
                  </span>
                </div>
                <div>
                  <span className="text-xl flex items-center text-empathy">
                    <TbHeartHandshake />
                    <span className="text-gray-400 text-base pl-1">
                      {post.empathizeCount}{" "}
                      <span className="text-gray-300">Emphatizer</span>
                    </span>
                  </span>
                </div>
                <div className="pt-7">
                  <span className="text-base text-gray-400">
                    This story is about{" "}
                    <span className="text-gray-300">
                      {post.category?.join(", ")}
                    </span>
                  </span>
                </div>
                <div className="text-accent text-lg">{post.content}</div>
              </div>
              <div className="flex gap-3">
                {/* <button className="flex justify-center items-center gap-2 tracking-wide rounded-3xl bg-accent text-neutral font-bold p-3 px-8 text-sm hover:bg-neutral hover:text-accent transition-all duration-300 ease-in-out">
                  <TbHeartHandshake className="text-lg" />
                  Emphatize
                </button> */}
                <FunctionButton />
                <FunctionButton />
                <FunctionButton />
              </div>
            </div>
          </>
        ) : (
          <div>Failed to retrieve post!</div>
        )}
      </div>
    </MainLayout>
  );
}
