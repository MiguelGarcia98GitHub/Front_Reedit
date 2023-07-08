import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseBackendURL } from "../../config/globals";
import { CommunityTopBar, Modal } from "../../components";
import { Post as PostInterface } from "../../interfaces/interfaces";

const Post = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const [post, setPost] = useState<PostInterface | null>(null);

  const { postId } = useParams();
  const navigate = useNavigate();

  async function getSinglePostById(postId: number) {
    try {
      const response = await fetch(`${baseBackendURL}/posts/${postId}`);

      const postData: PostInterface = await response.json();

      if (response.status !== 200) {
        setModalTitle("Error");
        setModalContent("No post was found... wrong post Id");
        setIsModalOpen(true);
        setTimeout(() => {
          navigate("/");
        }, 2200);
      }

      setPost(postData);
    } catch (error) {
      setModalTitle("Error");
      setModalContent("Servers are currently down");
      setIsModalOpen(true);
    }
  }

  useEffect(() => {
    getSinglePostById(Number(postId));
  }, []);

  return (
    <div className="pl-5 pr-5 py-5">
      {post && <CommunityTopBar community={post.community} />}
      {post && (
        <div className="p-4 mb-4">
          <div className="font-bold text-lg mb-2">{post.title}</div>
          {post.imageUrl && (
            <div className="relative w-full h-64 mb-8">
              <img
                src={post.imageUrl}
                alt="Post content"
                className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
              />
            </div>
          )}
          <div className="text-gray-700 mb-8">{post.description}</div>
          <div className="flex items-center">
            <div className="flex-1 border-t border-gray-500"></div>
            <span className="relative top-0.5 px-2 text-gray-500">
              Comments: {post.comments.length}
            </span>
            <div className="flex-1 border-t border-gray-500"></div>
          </div>
          {post &&
            post.comments &&
            post.comments.map((comment) => (
              <div
                key={comment.id}
                className="border border-gray-200 rounded-md p-2 my-2"
              >
                <div className="text-gray-600 font-bold">
                  comment by: {comment.user.username}
                </div>
                <div className="text-gray-800">{comment.content}</div>
              </div>
            ))}
        </div>
      )}
      {
        <Modal
          title={`${modalTitle}`}
          content={`${modalContent}`}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      }
    </div>
  );
};

export default Post;
