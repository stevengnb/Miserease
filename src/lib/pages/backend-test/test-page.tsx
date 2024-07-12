import { addPost, empathizePost, getOwnedPost, unempathizePost } from "../../services/post-service";
import { loginUser, logoutUser, registerUser, updateUser } from "../../services/user-service";
import { Post } from "../../types/post-type";
import { UserLogin, UserRegister, UserUpdate } from "../../types/user-type";

const TestPage = () => {
    
    const handleRegister = async () => {
        const dummy : UserRegister = {
            email: "stevengnb@gmail.com",
            password: "miserease",
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

    const handleEmpathizePost = async() => {
        const response = await empathizePost("Wsg4DikzKLCNvAigWnRW")
        console.log(response.message)
    }
    const handleUnempathizePost = async() => {
        const response = await unempathizePost("Wsg4DikzKLCNvAigWnRW")
        console.log(response.message)
    }

    return (
        <div>
            <button onClick={handleRegister}>Register</button>
            <br />
            <button onClick={handleLogin}>Login</button>
            <br />
            <button onClick={logoutUser}>Logout</button>
            <br />
            <button onClick={handleAddPost}>Add post</button>
            <br />
            <button onClick={handleGetOwnedPost}>Get Owned Post</button>
            <br />
            <button onClick={handleEmpathizePost}>Empathize</button>
            <br />
            <button onClick={handleUnempathizePost}>Unempathize</button>
        </div>
    )
}

export default TestPage;