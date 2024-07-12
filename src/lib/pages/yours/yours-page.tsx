import { useEffect, useState } from "react";
import { getOwnedPost } from "../../services/post-service";
import MainLayout from "../layout/main-layout";
import { isErrorResponse } from "../../utils/validate-util";
import { Post } from "../../types/post-type";
import Loader from "../../../components/loader";
import PostCard from "../../../components/post-card";

export default function YoursPage() {


  const [error, setError] = useState<string>("");  
  const [posts, setPosts] = useState<Post[]>([]);  
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getOwnedPost();
        if (isErrorResponse(postsData)) {
          setError(postsData.message);
        } else {
          setPosts(postsData);
          console.log(postsData)
        }
      } catch (err) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  return (
    <MainLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="justify-center flex col-span-3">
            <Loader />
          </div>
        ) : error ? (
          <div className="text-center text-accent col-span-3">{error}</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-accent col-span-3">No stories found. Be the first to share a tale of perseverance.</div>
        ) : (
          posts.map((post) => <PostCard key={post.postID} post={post} />)
        )}
      </div>
    </MainLayout>
  );
}
