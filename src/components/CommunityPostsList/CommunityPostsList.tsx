import { useNavigate } from "react-router-dom";
import { Post } from "../../interfaces/interfaces";

interface Props {
  posts: Post[];
}

const CommunityPostsList: React.FC<Props> = ({ posts }) => {
  const navigate = useNavigate();

  console.log("posts received:");
  console.log(posts);

  return (
    <div className="pl-5 pr-5 py-5">
      {posts &&
        posts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-300 shadow-md rounded-md p-4 mb-4 cursor-pointer"
            onClick={() => {
              navigate(`/community/${post.community.name}/post/${post.id}`);
            }}
          >
            <div className="flex items-center mb-2">
              <img
                src={post.community.imageUrl}
                alt="Post Image"
                className="w-12 h-12 rounded-full mr-2"
              />
              <div className="text-gray-700">
                posted by {post.creator.username} in r/{post.community.name}
              </div>
            </div>
            <div className="font-bold text-lg mb-2">{post.title}</div>
            <div className="text-gray-700">{post.description}</div>
          </div>
        ))}
    </div>
  );
};

export default CommunityPostsList;
