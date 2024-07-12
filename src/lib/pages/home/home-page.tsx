import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import PostCard from "../../../components/post-card";
import { Post } from "../../types/post-type";
import MainLayout from "../layout/main-layout";
import {
  getAllPostByDate,
  getAllPostByTitle,
} from "../../services/post-service"; // Adjust the path as necessary

import { FaSearch } from "react-icons/fa";
import { isErrorResponse } from "../../utils/validate-util";
import Loader from "../../../components/loader";

interface SearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="mt-2 flex items-center border-2 border-opacity-50 border-accent-light rounded-full overflow-hidden">
        <span className="pl-3 text-accent">
          <FaSearch />
        </span>
        <input
          type="text"
          placeholder="Search..."
          className="p-2 w-full outline-none placeholder-accent-dark text-accent bg-transparent"
          value={value}
          onChange={onChange}
        />
      </div>
    </form>
  );
};

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchSubmitted, setSearchSubmitted] = useState<boolean>(false)

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchSubmitted(true)
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getAllPostByDate();
        if (isErrorResponse(postsData)) {
          setError(postsData.message);
        } else {
          setPosts(postsData);
        }
      } catch (err) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getAllPostByTitle(search);
        if (isErrorResponse(postsData)) {
          setError(postsData.message);
        } else {
          setPosts(postsData);

          console.log(postsData)
        }
      } catch (err) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts()
  }, [searchSubmitted]);

  return (
    <MainLayout>
      <div className="py-14 flex justify-center items-center text-accent flex-col gap-4">
        <div className="text-4xl font-medium">Discover other's pain.</div>
        <div className="text-lg font-extralight text-gray-400">
          Through knowing others, we know ourselves better.
        </div>
        <div className="w-1/2">
          <SearchInput
            value={search}
            onChange={handleSearchChange}
            onSubmit={handleSearchSubmit}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {loading ? (
          <div className="justify-center flex col-span-3">
            <Loader />
          </div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          posts.map((post) => <PostCard key={post.postID} post={post} />)
        )}
      </div>
    </MainLayout>
  );
};

export default HomePage;
