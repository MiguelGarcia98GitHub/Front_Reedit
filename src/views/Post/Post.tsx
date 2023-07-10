import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { baseBackendURL } from "../../config/globals";
import { CommunityTopBar, Modal } from "../../components";
import { CommentDTO, Post as PostInterface } from "../../interfaces/interfaces";
import { Disclosure } from "@headlessui/react";
import { useStore } from "../../store/zustandStore";
import { motion, AnimatePresence } from "framer-motion";

const Post = () => {
  const closeCommentButtonRef = useRef<HTMLButtonElement | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const [post, setPost] = useState<PostInterface | null>(null);

  const [createCommentInputValue, setCreateCommentInputValue] = useState("");

  const { postId } = useParams();
  const navigate = useNavigate();
  const { logged } = useStore();

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

  async function createComment(comment: CommentDTO) {
    try {
      const response = await fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${logged!.access_token}`,
        },
        body: JSON.stringify(comment),
      });

      if (!response.ok) {
        // TODO
      }

      const data = await response.json();

      return data;
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
          <div className="font-bold text-xl mb-2">{post.title}</div>
          {post.imageUrl && (
            <div className="relative w-full h-96 mb-8">
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
          {logged ? (
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={`my-2 py-2 px-3 text-white ${
                      open ? "bg-orange-600" : "bg-orange-500"
                    } rounded-md flex justify-center`}
                    ref={closeCommentButtonRef}
                    onClick={() => {
                      setCreateCommentInputValue("");
                    }}
                  >
                    {open ? "Close" : "Add Comment"}
                  </Disclosure.Button>
                  <Disclosure.Panel className="text-gray-500">
                    {open && (
                      <div className="mt-2">
                        <textarea
                          value={createCommentInputValue}
                          onChange={(e) =>
                            setCreateCommentInputValue(e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Enter comment"
                        />
                        <button
                          onClick={() => {
                            // handle comment creation
                            createComment({
                              content: createCommentInputValue,
                              postId: Number(postId),
                            })
                              .then((commentData) => {
                                setPost({
                                  ...post,
                                  comments: [...post.comments, commentData],
                                });
                                setCreateCommentInputValue("");
                                closeCommentButtonRef &&
                                  closeCommentButtonRef.current &&
                                  closeCommentButtonRef.current.click();
                              })
                              .catch((error) => {
                                // TODO
                              });
                          }}
                          className="mt-2 w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 rounded-md text-white text-sm flex justify-center"
                        >
                          Create Comment
                        </button>
                      </div>
                    )}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ) : (
            <div className="w-full max-w-sm mx-auto mt-4 p-6 bg-white rounded-md shadow-md text-center text-gray-700">
              You need to be logged in to create a comment
            </div>
          )}
          <AnimatePresence>
            {post &&
              post.comments &&
              post.comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  className="border border-gray-200 rounded-md p-2 my-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-gray-600 font-bold">
                    comment by: {comment.user.username}
                  </div>
                  <div className="text-gray-800">{comment.content}</div>
                </motion.div>
              ))}
          </AnimatePresence>
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
