import { addPost, getOwnedPost, resolvePost } from "../../services/post-service";
import { loginUser, logoutUser, registerUser, updateUser } from "../../services/user-service";
import { Post } from "../../types/post-type";
import { UserLogin, UserRegister, UserUpdate } from "../../types/user-type";

const TestPage = () => {
    
    const handleRegister = async () => {
        const dummy : UserRegister = {
            email: "reeynv11@gmail.com",
            password: "miserease",
            age: 20,
            gender: 'male'
        }

        const response = await registerUser(dummy);
        console.log(response.message)
    }

    const handleLogin = async () => {
        const dummy : UserLogin = {
            email: "reeynv11@gmail.com",
            password: "miserease",
        }

        const response = await loginUser(dummy);
        console.log(response.message)
    }

    const handleUpdateUser = async() => {
        const dummy : UserUpdate = {
            age: 18,
            gender: 'male'
        }

        const response = await updateUser(dummy);
        console.log(response.message)
    }

    const handleAddPost = async() => {
        const dummy : Post = {
            title: "I got a friend in me",
            content: "This friend do sum silly things but is so serious with work haha",
            category: ["relationships"]
        }

        const response = await addPost(dummy);
        console.log(response.message)
    }

    const handleGetOwnedPost = async() => {
        const response = await getOwnedPost();
        if(!response.success){
            console.log(response.message)
        }
        else console.log(response.data)
    }

    return (
        <div>
            <button onClick={handleLogin}>Login</button>
            <br />
            <button onClick={logoutUser}>Logout</button>
            <br />
            <button onClick={handleAddPost}>Add post</button>
            <br />
            <button onClick={handleGetOwnedPost}>Get Owned Post</button>
        </div>
    )
}

export default TestPage;