import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebase-config";
import { Post } from "../types/post-type";

// ----------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------- ADD POST
// ----------------------------------------------------------------------------------------------------------------------

export const addPost = async (post: Post) => {
  // get user id
  const user = auth.currentUser;
  if (!user) {
    return {
      success: false,
      message: "Please log in before posting!",
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
      message: "Post title must be filled!",
    };
  } else if (
    (post.category?.length ?? 0) <= 0 ||
    post.category === null ||
    post.category === undefined
  ) {
    return {
      success: false,
      message: "Post category must be selected!",
    };
  } else if (
    post.content?.trim() === "" ||
    post.content === null ||
    post.content === undefined
  ) {
    return {
      success: false,
      message: "Post content must be filled!",
    };
  }

  // get auto generated field
  const uid = user.uid;
  const postedDate = new Date(Date.now());
  const resolvedComment = null;
  const empathizeCount = 0;

  // set auto generated field
  post = {
    ...post,
    posterID: uid,
    postedDate: postedDate,
    resolved: false,
    resolvedComment: resolvedComment,
    empathizeCount: empathizeCount,
    archived: false,
    banned: false,
  };

  // exclude postID to get auto generated id from firebase
  const { postID, ...excludedPost } = post;

  // add post to database
  try {
    const addedPost = await addDoc(collection(db, "posts"), {
      ...excludedPost,
    });

    const response = await addOwnedPost(addedPost.id);

    if (!response?.success) {
      return {
        success: false,
        message: "Post added successfully!",
      };
    }

    return {
      success: true,
      message: "Post added successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to add post: " + error,
    };
  }
};

export const addOwnedPost = async (postID: string) => {
  const user = auth.currentUser;
  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  const docRef = doc(db, "users", user.uid);
  try {
    await updateDoc(docRef, {
      ownedPost: arrayUnion(...[postID]),
    });

    return {
      success: true,
      message: "Success user posted",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error adding post to user",
    };
  }
};

export const resolvePost = async (postID: string, resolvedComment: string) => {
  // validate resolvedComment
  if (!resolvedComment || resolvedComment.trim() === "") {
    return {
      success: false,
      message: "Resolved comment must be filled!",
    };
  }

  // get the document reference
  const postRef = doc(db, "posts", postID);

  try {
    // fetch the document
    const postSnap = await getDoc(postRef);

    if (!postSnap.exists()) {
      return {
        success: false,
        message: "Post doesn't exist!",
      };
    }

    // perform the update
    await updateDoc(postRef, {
      status: true,
      resolvedComment: resolvedComment,
    });

    return {
      success: true,
      message: "Post resolved successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to resolve post: " + error,
    };
  }
};

// ----------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------- REPORT POST (NOT USED)
// ----------------------------------------------------------------------------------------------------------------------
// blm tentu fixed
export const reportPost = async (postID: string, reason: string) => {
  // get the document reference
  const postRef = doc(db, "posts", postID);

  try {
    // fetch the document
    const postSnap = await getDoc(postRef);

    if (!postSnap.exists()) {
      return {
        success: false,
        message: "Post doesn't exist!",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to retrieve post: " + error,
    };
  }

  // check if the post is already reported
  const q = query(
    collection(db, "reportedPosts"),
    where("reportedPost", "==", postID)
  );
  try {
    const querySnapshot = await getDocs(q);
    const reportedPostDoc = querySnapshot.docs[0];
    if (!querySnapshot.empty) {
      const isSolved = reportedPostDoc.data().status === true;
      if (isSolved) {
        return {
          success: false,
          message: "Post is already marked as solved.",
        };
      } else {
        await updateDoc(reportedPostDoc.ref, {
          reason: arrayUnion(...[reason]),
        });

        return {
          success: true,
          message: "Reason added to reported post successfully!",
        };
      }
    }

    // add new reportedPost doc
    await addDoc(collection(db, "reportedPosts"), {
      reportedPost: postID,
      reason: reason, // Initial reason array
      reportedAt: new Date(),
      status: false, // Example: Status field indicating if the post is solved
    });

    return {
      success: true,
      message: "Post reported successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to report post: " + error,
    };
  }
};


// ----------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------- GET POST
// ----------------------------------------------------------------------------------------------------------------------
export const getAllPostByDate = async () => {
    const postsCollection = collection(db, 'posts');
    const q = query(postsCollection, orderBy('postedDate', 'desc'));

    try {
        const querySnapshot = await getDocs(q);
        const posts: Post[] = [];

        querySnapshot.forEach(doc => {
            const data = doc.data();
            if (data.postedDate) {
                posts.push({
                    postID: doc.id,
                    ...data,
                    postedDate: data.postedDate.toDate(),
                } as Post);
            } else {
                console.warn(`Document ${doc.id} is missing postedDate field.`);
            }
        });

        return posts;
    } catch (error) {
        return {
            success: false,
            message: `Error fetching posts`,
        };
    }
};

export const getAllPostByCategory = async(category: string) => {
    
}

export const getPostById = async(postID : string) => {
    const postDocRef = doc(db, 'posts', postID);

    try {
        const postDoc = await getDoc(postDocRef);
        if (postDoc.exists()) {
            return {
                success: "true",
                data: postDoc as Post,
            }
        } else {
            return {
                success: false,
                message: "Post not found"
            };
        }
    } catch (error) {
        return {
            success: false,
            message: "Error fetching post"
        };
    }
}

export const getAllPostByTitle = async (search: string) => {
    try {
        const postsCollection = collection(db, 'posts');
        const querySnapshot = await getDocs(postsCollection);

        const filteredPosts: Post[] = [];

        querySnapshot.forEach(doc => {
            const title = doc.data().title.toLowerCase();
            if (title.includes(search.toLowerCase())) {
                filteredPosts.push({
                    postID: doc.id,
                    ...doc.data(),
                    postedDate: doc.data().postedDate.toDate(),
                } as Post);
            }
        });

        return filteredPosts
    } catch (error) {
        console.error("Error fetching posts:", error);
        return {
            success: false,
            message: "Failed to search posts",
        };
    }
};

export const getOwnedPost = async () => {
    const user = auth.currentUser;
        if (!user) {
        return {
            success: false,
            message: "User not found",
        };
    }

    const docRef = doc(db, "users", user.uid);
    try {
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists) {
            return {
                success: false,
                message: "Error fetching user 1",
            };
        }

        const ownedPostID: string[] = docSnap.data()?.ownedPost || [];
        const posts: Post[] = [];

        for (const postID of ownedPostID) {
            const postDocRef = doc(db, "posts", postID);
            const postDoc = await getDoc(postDocRef);

            if (postDoc.exists()) {
                const postData = postDoc.data() as Post;
                postData.postID = postDoc.id;
                posts.push(postData);
            } else {
                console.warn(`Post with ID ${postID} not found`);
            }
        }

        return {
            success: true,
            message: "Success retrieve own posts",
            data: posts
        };
    } catch (error) {
        return {
            success: false,
            message: "Error fetching posts",
        };
    }
};

// ----------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------- EMPATHIZE
// ----------------------------------------------------------------------------------------------------------------------

export const empathizePost = async(postID : string) => {
    const postDocRef = doc(db, 'posts', postID);

    try {
        const response = await addEmpathizedPostUser(postID)

        if(!response.success){
            return response
        }

        const postSnap = await getDoc(postDocRef);

        if (!postSnap.exists()) {
            return {
                success: false,
                message: "Post doesn't exist!",
            };
        }

        await updateDoc(postDocRef, {
            empathizeCount: increment(1),
        });

        return {
            success: true,
            message: 'Successfully empathized with the post',
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to empathize with the post',
        };
    }
}

export const addEmpathizedPostUser = async (postID: string) => {
    const user = auth.currentUser;
    if (!user) {
        return {
            success: false,
            message: "User not found", 
        };
    }

    const docRef = doc(db, "users", user.uid);
    try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();

            if (userData.empathizedPost && userData.empathizedPost.includes(postID)) {
                return {
                    success: false,
                    message: "User has already empathized with this post",
                };
            }

            await updateDoc(docRef, {
                empathizedPost: arrayUnion(...[postID]),
            });

            return {
                success: true,
                message: "Successfully empathized with the post",
            };
        } else {
            return {
                success: false,
                message: "User document not found",
            };
        }
    } catch (error) {
        return {
            success: false,
            message: "Error empathized from user",
        };
    }
};

export const unempathizePost = async (postID: string) => {
    const user = auth.currentUser;
    if (!user) {
        return {
            success: false,
            message: "User not found",
        };
    }

    const userDocRef = doc(db, "users", user.uid);
    const postDocRef = doc(db, "posts", postID);

    try {
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            if (userData.empathizedPost && userData.empathizedPost.includes(postID)) {

                const postSnap = await getDoc(postDocRef);

                if (!postSnap.exists()) {
                    return {
                        success: false,
                        message: "Post doesn't exist!",
                    };
                }

                await updateDoc(postDocRef, {
                    empathizeCount: increment(-1),
                });

                await updateDoc(userDocRef, {
                    empathizedPost: arrayRemove(postID),
                });

                return {
                    success: true,
                    message: "Successfully unempathized the post",
                };
            } else {
                return {
                    success: false,
                    message: "User has not empathized with this post",
                };
            }
        } else {
            return {
                success: false,
                message: "User document not found",
            };
        }
    } catch (error) {
        return {
            success: false,
            message: "Error unempathizing post",
        };
    }
};

// ----------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------- ARCHIVE POST
// ----------------------------------------------------------------------------------------------------------------------

export const archivePost = async(postID : string) => {
    const postDocRef = doc(db, 'posts', postID);

    try {
        const postSnap = await getDoc(postDocRef);

        if (!postSnap.exists()) {
            return {
                success: false,
                message: "Post doesn't exist!",
            };
        }

        await updateDoc(postDocRef, {
            archived: true,
        });

        return {
            success: true,
            message: 'Successfully archive post',
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to archive post',
        };
    }
}

export const unarchivePost = async(postID : string) => {
    const postDocRef = doc(db, 'posts', postID);

    try {
        const postSnap = await getDoc(postDocRef);

        if (!postSnap.exists()) {
            return {
                success: false,
                message: "Post doesn't exist!",
            };
        }

        await updateDoc(postDocRef, {
            archived: false,
        });

        return {
            success: true,
            message: 'Successfully unarchive post',
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to unarchive post',
        };
    }
}