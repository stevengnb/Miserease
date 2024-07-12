import PostCard from "../../../components/post-card";
import { logoutUser } from "../../services/user-service";
import { Post } from "../../types/post-type";
import MainLayout from "../layout/main-layout";

const HomePage = () => {
  const handleLogout = async () => {
    const response = await logoutUser();
    console.log(response.message);
  };

  const dummyPost: Post = {
    postID: "1",
    title: "I failed my exam so bad :(",
    postedDate: new Date(),
    content:
      "This is a sample post about React Context. I am sharing my experience and the challenges I faced while learning it. Despite my efforts, I couldn't grasp some concepts, which led to poor performance in the exam. I am looking for advice on how to improve and understand React Context better.",
    resolvedComment: "",
    emphatizeCount: 42,
  };

  return (
    <MainLayout>
      <div className="flex ">

      </div>
      <div className="p-4 grid grid-cols-4">
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
        <PostCard post={dummyPost} />
      </div>
    </MainLayout>
  );
};

export default HomePage;
