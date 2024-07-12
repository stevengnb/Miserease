import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../firebase/firebase-config";
import { UserLogin, UserRegister, UserUpdate } from "../types/user-type";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

// pakai UserRegister (email, password, age, gender)
export const registerUser = async (user: UserRegister) => {
  if (!user.email || !user.password || !user.gender) {
    return {
      success: false,
      message: "All field is required.",
    };
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    const uid = userCredential.user.uid;

    await setDoc(doc(db, "users", uid), {
      email: user.email,
      gender: user.gender,
      role: "user",
    });

    return {
      success: true,
      message: "Register user Success",
    };
  } catch (err) {
    return {
      success: false,
      message: "Register user failed",
    };
  }
};

// pakai UserLogin (email, password)
export const loginUser = async (user: UserLogin) => {
  if (!user.email || !user.password) {
    return {
      success: false,
      message: "All field is required.",
    };
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    const uid = userCredential.user.uid;

    return {
      success: true,
      message: "Login success",
      uid: uid,
    };
  } catch (err) {
    return {
      success: false,
      message: "Login failed.",
    };
  }
};

export const getUserById = async (uid?: string) => {
  if (!uid) {
    return {
      success: false,
      message: "User ID not provided",
    };
  }

  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as User;
    } else {
      return {
        success: false,
        message: `User not found. (${uid})`,
      };
    }
  } catch (err) {
    return {
      success: false,
      message: "Firebase error.",
    };
  }
};

export const updateUser = async (user: UserUpdate) => {
  const userCheck = auth.currentUser;
  if (!userCheck) {
    return {
      success: false,
      message: "Not logged in",
    };
  } else if (!user.age || !user.gender) {
    return {
      success: false,
      message: "All field is required.",
    };
  } else if (user.age < 15) {
    return {
      success: false,
      message: "Age must be more than 14",
    };
  }

  try {
    const docRef = doc(db, "users", userCheck.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        age: user.age,
        gender: user.gender,
      });

      return {
        success: true,
        message: `User ${userCheck.uid} updated successfully!`,
      };
    } else {
      return {
        success: false,
        message: `User not found. (${userCheck.uid})`,
      };
    }
  } catch (err) {
    return {
      success: false,
      message: "Firebase error.",
    };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);

    return {
      success: true,
      message: "Logout success",
    };
  } catch (err) {
    return {
      success: false,
      message: "Logout failed",
    };
  }
};
