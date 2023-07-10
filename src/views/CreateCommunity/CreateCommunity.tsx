import { useState } from "react";
import { useStore } from "../../store/zustandStore";
import { Modal } from "../../components";
import { delay } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { CommunityDTO } from "../../interfaces/interfaces";

export default function CreateCommunity() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { logged } = useStore();
  const navigate = useNavigate();

  async function createCommunity(community: CommunityDTO) {
    const response = await fetch("http://localhost:3000/communities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logged!.access_token}`,
      },

      body: JSON.stringify(community),
    });

    console.log("response from createCommunity:");
    console.log(response);

    if (!response.ok) {
      // TODO
    }

    const data = await response.json();

    console.log("data from createCommunity:");
    console.log(data);

    return data;
  }

  return (
    <div className="w-full max-w-sm mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 text-center">
        Create a Community
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="mt-4"
      >
        <label className="block mt-3">
          <span className="text-gray-700">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            createCommunity({
              name,
              imageUrl,
            })
              .then(async (communityData) => {
                setModalTitle("Success");
                setModalContent("Your community has been created!");
                setIsModalOpen(true);
                await delay(2200);
                navigate(`/community/${communityData.name}`);
              })
              .catch(() => {});
          }}
        >
          Create Community
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
