import { Post } from "../../types/post-type";
import MainLayout from "../layout/main-layout";
import { useParams } from "react-router-dom";

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const post: Post = {
    postID: "adslfkajsldfjkasldfkjs",
    posterID: "lskjdslfjdslfkjasdf",
    title: "I failed my exam so bad :(",
    postedDate: new Date(Date.now()),
    category: ["School", "Personal"],
    resolved: false,
    resolvedComment: "",
    emphatizeCount: 232,
    archived: false,
    banned: false
  }
  return (
    <MainLayout>
      <div>
        
      </div>
    </MainLayout>
  );
}
