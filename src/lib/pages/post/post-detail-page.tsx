import { Post } from "../../types/post-type";
import MainLayout from "../layout/main-layout";
import { useParams } from "react-router-dom";
import { formatDate } from "../../services/formatter-service";
import { TbHeartHandshake } from "react-icons/tb";
import BackButton from "../../../components/back-button";
import {
  empathizePost,
  getPostById,
  unempathizePost,
} from "../../services/post-service";
import { useEffect, useState } from "react";
import Loader from "../../../components/loader";
import { auth } from "../../../firebase/firebase-config";
import { FaRegLightbulb } from "react-icons/fa";
import { resolve } from "path";

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [isResolve, setResolve] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkIsEmpathized = () => {
    return (
      post &&
      post.posterID &&
      post.empathizedUser &&
      post.empathizedUser?.length >= 0 &&
      auth.currentUser &&
      post.empathizedUser?.includes(auth.currentUser?.uid)
    );
  };

  const changeEmpathized = async (postID: string) => {
    if (checkIsEmpathized()) {
      console.log("lakuin unempathize");
      await unempathizePost(postID);
    } else {
      console.log("lakuin empathizeeeeeee");
      const response = await empathizePost(postID);
      console.log(response.message);
    }
  };

  const fetchPost = (postId: string) => {
    setLoading(true);
    const unsubscribe = getPostById(postId, (response) => {
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
      setLoading(false);
    });

    return unsubscribe;
  };

  const handleResolve = () => {
    setResolve(!isResolve);
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
                <div
                  className={
                    post.resolved
                      ? "bg-accent text-neutral text-sm font-thin px-6 py-3 rounded-3xl"
                      : "bg-neutral text-accent text-sm font-thin px-6 py-3 rounded-3xl"
                  }
                >
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
                <button
                  className={
                    !checkIsEmpathized()
                      ? "w-max rounded-full p-2 bg-neutral text-accent hover:scale-110 flex items-center justify-center transition-all duration-300 shadow-xl"
                      : "w-max rounded-full p-2 bg-accent text-neutral hover:scale-110 flex items-center justify-center transition-all duration-300 shadow-xl"
                  }
                  onClick={() => post.postID && changeEmpathized(post.postID)}
                >
                  <TbHeartHandshake className="w-6 h-6" />
                </button>
                {auth.currentUser && auth.currentUser.uid && (
                  <button
                    className={
                      !isResolve
                        ? "w-max rounded-full p-2 bg-neutral text-accent hover:scale-110 flex items-center justify-center transition-all duration-300 shadow-xl"
                        : "w-max rounded-full p-2 bg-accent text-neutral hover:scale-110 flex items-center justify-center transition-all duration-300 shadow-xl"
                    }
                    onClick={handleResolve}
                  >
                    <FaRegLightbulb className="w-6 h-6" />
                  </button>
                )}
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
