import PostCard from "../../../components/post-card";
import { Post } from "../../types/post-type";

export default function RegisterPage() {

  const dummyPost: Post = {
    postID: "1",
    title: "I failed my exam so bad :(",
    postedDate: new Date(),
    category: "Web Development",
    content: "This is a sample post about React Context. I am sharing my experience and the challenges I faced while learning it. Despite my efforts, I couldn't grasp some concepts, which led to poor performance in the exam. I am looking for advice on how to improve and understand React Context better.",
    resolvedComment: "",
    emphatizeCount: 42,
  };

  return (
    <div className="min-h-screen bg-primary p-10">
      <div className="grid grid-cols-4">
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
      </div>
    </div>
  );
}
