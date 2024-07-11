import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase-config";
import { Post } from "../types/post-type";

export const addPost = async (post: Post) => {
  // get user id
  const user = auth.currentUser;
  if (!user) {
    return {
      success: false,
      message: "Please log in before posting",
    };
  }

  // validate not empty
  if (
    post.title?.trim() === "" ||
    post.title === null ||
    post.title === undefined
  ) {
    return {
      success: false,
      message: "Post title must be filled",
    };
  } else if (
    post.postedDate === null ||
    post.postedDate === undefined ||
    post.postedDate instanceof Date !== true ||
    isNaN(post.postedDate.getTime())
  ) {
    return {
      success: false,
      message: "Post date is invalid",
    };
  } else if (
    post.category?.trim() === "" ||
    post.category === null ||
    post.category === undefined
  ) {
    return {
      success: false,
      message: "Post category must be selected",
    };
  } else if (
    post.content?.trim() === "" ||
    post.content === null ||
    post.content === undefined
  ) {
    return {
      success: false,
      message: "Post content must be filled",
    };
  }

  console.log("Test");

  // get auto generated field
  const uid = user.uid;
  const postedDate = new Date(Date.now());
  const status = false;
  const resolvedComment = null;
  const emphatizeCount = 0;

  // set auto generated field
  post = {
    ...post,
    posterID: uid,
    postedDate: postedDate,
    status: status,
    resolvedComment: resolvedComment,
    emphatizeCount: emphatizeCount,
  };

  // exclude postID to get auto generated id from firebase
  const { posterID, ...excludedPost } = post;

  // add post to database
  try {
    await addDoc(collection(db, "posts"), {
      ...excludedPost,
    });
    return {
      success: true,
      message: "Post added successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to add post: " + error,
    };
  }
};
