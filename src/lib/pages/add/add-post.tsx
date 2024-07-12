import { useState } from "react";
import MainLayout from "../layout/main-layout";
import { Post } from "../../types/post-type";

export default function AddPost() {
  const [newPost, setNewPost] = useState<Post>({
    title: "",
    content: "",
    category: [],
  });

  return (
    <MainLayout>
      <div className="h-screen w-screen bg-primary flex items-center text-accent p-40 px-60">
        <div className="flex h-full w-full">
          <input placeholder="input your title..." className="h-12 w-96 p-4 bg-neutral rounded-lg" />
        </div>
      </div>
    </MainLayout>
  );
}
