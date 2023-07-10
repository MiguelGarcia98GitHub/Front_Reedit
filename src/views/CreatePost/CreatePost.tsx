import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { Community, PostDTO } from "../../interfaces/interfaces";
import { useStore } from "../../store/zustandStore";
import { Modal } from "../../components";
import { delay } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const [communities, setCommunities] = useState([
    {
      id: 1,
      name: "Choose a community",
      imageUrl: "",
    },
  ] as Community[]);
  const [selectedCommunity, setSelectedCommunity] = useState(communities[0]);
  const [communityInputFocus, setCommunityInputFocus] = useState(false);
  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { logged } = useStore();
  const navigate = useNavigate();

  const filteredCommunities =
    query === ""
      ? communities
      : communities.filter((community) =>
          community.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  async function getAllCommunities() {
    const response = await fetch("http://localhost:3000/communities");

    const communitiesFetchData = await response.json();

    setCommunities(communitiesFetchData);
  }

  async function createPost(post: PostDTO) {
    const response = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logged!.access_token}`,
      },

      body: JSON.stringify(post),
    });

    if (!response.ok) {
      // TODO
    }

    const data = await response.json();

    return data;
  }

  useEffect(() => {
    getAllCommunities();
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 text-center">
        Create a Post
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="mt-4"
      >
        <label className="block mt-3">
          <span className="text-gray-700">Community</span>
        </label>
        <Combobox value={selectedCommunity} onChange={setSelectedCommunity}>
          <div className="relative mt-1">
            <div className="relative w-full text-gray-600">
              <Combobox.Input
                className="w-full py-2 pl-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
                displayValue={(community: Community) => community.name}
                onChange={(event) => setQuery(event.target.value)}
                onFocus={() => {
                  setCommunityInputFocus(true);
                }}
                onBlur={() => {
                  setCommunityInputFocus(false);
                }}
              />
            </div>
            <Transition
              as={Fragment}
              show={communityInputFocus || query !== ""}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredCommunities.length === 0 ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    No communities found.
                  </div>
                ) : (
                  filteredCommunities.map((community) => (
                    <Combobox.Option
                      key={community.id}
                      className={({}) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4`
                      }
                      value={community}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {community.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-orange-600"
                              }`}
                            >
                              ✅
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>

        <label className="block mt-3">
          <span className="text-gray-700">Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </label>

        <label className="block mt-3">
          <span className="text-gray-700">Content</span>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </label>

        <label className="block mt-3">
          <span className="text-gray-700">Image URL</span>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </label>

        <button
          type="submit"
          className="w-full mt-6 py-2 px-4 text-center bg-orange-600 rounded-md text-white text-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 cursor-pointer"
          onClick={() => {
            createPost({
              title,
              description: content,
              imageUrl,
              communityId: selectedCommunity.id,
            })
              .then(async (postData) => {
                setModalTitle("Success");
                setModalContent("Your post has been created!");
                setIsModalOpen(true);
                await delay(2200);
                navigate(
                  `/community/${postData.community.name}/post/${postData.id} `
                );
              })
              .catch((error) => {});
          }}
        >
          Create Post
        </button>
      </form>
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
}
