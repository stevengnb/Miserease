import { resolvePost } from "../../services/post-service";

const TestPage = () => {

    const handleTest = async () => {
        resolvePost()
    }

    return (
        <div>
            <button onClick={handleTest}>Test Feature</button>
        </div>
    )
}

export default TestPage;