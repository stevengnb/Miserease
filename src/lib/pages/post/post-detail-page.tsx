import { Post } from "../../types/post-type";
import MainLayout from "../layout/main-layout";
import { useParams } from "react-router-dom";
import { formatDate } from "../../services/formatter-service";
import { TbHeartHandshake } from "react-icons/tb";
import toast from "react-hot-toast";
import {
  empathizePost,
  getPostById,
  resolvePost,
  unempathizePost,
} from "../../services/post-service";
import { useEffect, useState, ChangeEvent } from "react";
import Loader from "../../../components/loader";
import FloatingButton from "../../../components/float-button";
import { IoArrowBack } from "react-icons/io5";
import { auth } from "../../../firebase/firebase-config";
import { FaRegLightbulb } from "react-icons/fa";
import styles from "../add/add-post-page.module.css";
import { RiQuillPenLine } from "react-icons/ri";

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingResolve, setLoadingResolve] = useState(false);
  const [isResolve, setResolve] = useState(false);
  const [resolvedComment, setResolvedComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showSend, setShowSend] = useState(false);

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

  const handleTAChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setResolvedComment(event.target.value);
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

  const handleResolveComment = async () => {
    console.log("Asdasd");
    setLoadingResolve(true);

    if (!post || !post.postID) {
      setLoadingResolve(false);
      return;
    }

    const response = await resolvePost(post?.postID, resolvedComment);
    if (response.success) {
      setLoading(false);
      toast.success(response.message);
      window.location.reload();
      return;
    }

    setLoading(false);
    toast.error(response.message);
  };

  const handleResolve = () => {
    setResolve(!isResolve);
  };

  useEffect(() => {
    if (id) {
      fetchPost(id as string);
    }
  }, [id]);

  useEffect(() => {
    if (resolvedComment) {
      setShowSend(true);
    } else {
      setShowSend(false);
    }
  }, [resolvedComment]);

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
              <FloatingButton isDetail={true}>
                <IoArrowBack className="w-6 h-6" />
              </FloatingButton>
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
                {auth.currentUser &&
                  auth.currentUser.uid &&
                  post &&
                  post.posterID &&
                  auth.currentUser.uid === post.posterID &&
                  !post.resolved && (
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
              {post.resolved && !loadingResolve && (
                <div className="p-10">
                  <p>Resolve Comment:</p>
                  <p>{post.resolvedComment}</p>
                </div>
              )}
              {isResolve && (
                <div className="mt-8 flex flex-col items-center justify-center">
                  <textarea
                    value={resolvedComment}
                    onChange={handleTAChange}
                    className={`w-full h-3/4 md:h-full xl:px-16 text-lg bg-transparent rounded-lg resize-none focus:outline-none ${styles.customScrollbar}`}
                    placeholder="What makes you let it go..."
                  ></textarea>
                  <button
                    className={`${
                      showSend ? styles.visible : ""
                    } flex justify-center items-center gap-2 tracking-wide rounded-3xl bg-accent text-neutral font-bold p-3 px-6 h-10 w-36 md:w-1/5 hover:bg-neutral hover:text-accent transition-all duration-300 ease-in-out ${
                      styles.addButton
                    }`}
                    onClick={handleResolveComment}
                  >
                    {loadingResolve ? <Loader isNotAccent={true} /> : "Add"}
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div>Failed to retrieve post!</div>
        )}
      </div>
      <FloatingButton navigateTo="add-post" isFixed={true} position="bottom-right">
        <RiQuillPenLine className="w-8 h-8"/>
      </FloatingButton>
    </MainLayout>
  );
}
