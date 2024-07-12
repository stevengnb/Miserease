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
import FloatingButton from "../../../components/float-button";
import { RiQuillPenLine } from "react-icons/ri";


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
          placeholder="Search for stories..."
          className="p-2 text-sm md:text-base w-full outline-none placeholder-accent-dark text-accent bg-transparent"
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

    if (!searchSubmitted) return;

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
        setSearchSubmitted(false);
      }
    };

    fetchPosts()
  }, [searchSubmitted]);

  return (
    <MainLayout>
      <div className="py-8 lg:py-24 flex justify-start lg:justify-center lg:items-center text-accent flex-col gap-4">
        <div className="hidden text-center lg:block text-4xl font-medium">Understanding others' struggles makes us stronger.</div>
        <div className="hidden text-center lg:block text-lg font-extralight text-gray-400">
        Empathy builds bridges. Let's connect and heal as one community.
        </div>
        <div className="w-full lg:w-1/2">
          <SearchInput
            value={search}
            onChange={handleSearchChange}
            onSubmit={handleSearchSubmit}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="justify-center flex col-span-3">
            <Loader />
          </div>
        ) : error ? (
          <div className="text-center text-accent col-span-3">{error}</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-accent col-span-3">No stories found. Be the first to share a tale of perseverance.</div>
        ) : (
          posts.map((post) => <PostCard key={post.postID} post={post} />)
        )}
      </div>
      <FloatingButton navigateTo="add-post" isFixed={true} position="bottom-right">
        <RiQuillPenLine className="w-8 h-8"/>
      </FloatingButton>
    </MainLayout>
  );
};

export default HomePage;
