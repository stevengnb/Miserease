import { useState } from "react";
import MainLayout from "../layout/main-layout";
import { Post } from "../../types/post-type";

export default function AddPost() {
  const [newPost, setNewPost] = useState<Post>({
      content: "",
      title: "",
  });

  return (
    <MainLayout>
      <div className="bg-primary"></div>
    </MainLayout>
  );
}
