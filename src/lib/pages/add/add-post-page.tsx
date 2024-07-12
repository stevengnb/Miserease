import { useEffect, useState } from "react";
import { Post } from "../../types/post-type";
import Select from "react-select";
import styles from "./add-post-page.module.css";
import { IoSend } from "react-icons/io5";
import { addPost } from "../../services/post-service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/loader";
import BackButton from "../../../components/back-button";

export default function AddPost() {
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState<Post>({
    title: "",
    content: "",
    category: [],
  });
  const [loading, setLoading] = useState(false);
  const [showSend, setShowSend] = useState(false);

  const categories = [
    { value: "school", label: "School" },
    { value: "work", label: "Work" },
    { value: "family", label: "Family" },
    { value: "personal", label: "Personal" },
    { value: "financial", label: "Financial" },
    { value: "mental-health", label: "Mental Health" },
    { value: "health", label: "Health" },
  ];

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: "#161b33",
      width: "330px",
      minHeight: "48px",
      padding: "8px 3px",
      color: "#f1dac4",
      border: state.isFocus ? "none" : "#f8eadd",
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "#292838",
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: "#f8eadd",
      color: "#0d0c1d",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#161b33" : "#292838",
      color: "#f8eadd",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      backgroundColor: "#c23c2c",
      color: "#c23c2c",
    }),
  };

  const handleCategoryChange = (selectedOptions: any) => {
    setNewPost({
      ...newPost,
      category: selectedOptions
        ? selectedOptions.map((option: any) => option.value)
        : [],
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value,
    });
  };

  const handleTAChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value,
    });
  };

  const handleAddPost = async () => {
    setLoading(true);
    const response = await addPost(newPost);

    if (response.success) {
      setLoading(false);
      toast.success(response.message);
      navigate("/");
      return;
    }

    setLoading(false);
    toast.error(response.message);
  };

  useEffect(() => {
    if (newPost.content?.trim() !== "") {
      setShowSend(true);
    } else {
      setShowSend(false);
    }
  }, [newPost.content]);

  return (
    <div className="overflow-y-hidden overflow-x-hidden h-screen w-screen bg-primary flex items-center text-base text-accent pt-28 p-6 md:p-16 md:py-24 lg:p-28 lg:px-40 xl:p-40 xl:px-60 text-mono tracking-widest relative">
      <BackButton isFixed={true} />
      <div className="flex flex-col h-full w-full items-center justify-center">
        <div className="flex flex-col lg:flex-row items-start gap-3 lg:gap-0 lg:items-center justify-center w-full">
          <div className="flex items-center justify-center">
            <input
              value={newPost.title}
              type="text"
              name="title"
              placeholder="Give it a title..."
              className="h-12 w-64 xl:w-72 p-4 bg-secondary rounded-lg focus-visible:outline-none"
              onChange={handleInputChange}
            />
            <span className="text-3xl mx-2">.</span>
          </div>
          <div className="flex items-start md:items-center justify-center flex-col md:flex-row gap-2">
            <p className="md:ml-2 text-base lg:text-base">
              This story is about
            </p>
            <div className="flex items-center justify-start">
              <Select
                isMulti
                options={categories}
                className="md:ml-3 text-accent"
                classNamePrefix="react-select"
                styles={customStyles}
                onChange={handleCategoryChange}
              />
              <span className="text-3xl mx-2">.</span>
            </div>
          </div>
        </div>
        <div className="flex items-start justify-center w-full h-3/4 pt-8 md:pt-0 md:my-8">
          <textarea
            value={newPost.content}
            name="content"
            onChange={handleTAChange}
            className={`w-full h-3/4 md:h-full xl:px-16 text-lg bg-transparent rounded-lg resize-none focus:outline-none ${styles.customScrollbar}`}
            placeholder="Let your voice be heard..."
          ></textarea>
        </div>
        <button
          className={`${
            showSend ? styles.visible : ""
          } flex justify-center items-center gap-2 tracking-wide rounded-3xl bg-accent text-neutral font-bold p-3 px-6 w-36 md:w-1/4 hover:bg-neutral hover:text-accent transition-all duration-300 ease-in-out ${
            styles.addButton
          }`}
          onClick={handleAddPost}
        >
          {loading ? (
            <Loader />
          ) : (
            <>
              <IoSend />
              <p>Share</p>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
