import { useEffect, useState } from "react";
import { baseBackendURL } from "../../config/globals";
import { Link } from "react-router-dom";
import { Community } from "../../interfaces/interfaces";

const ExploreCommunities = () => {
  const [communitiesData, setCommunitiesData] = useState<Community[] | null>(
    null
  );
  const [query, setQuery] = useState("");

  async function getAllCommunities() {
    try {
      const response = await fetch(`${baseBackendURL}/communities`);

      const communitiesFetchData: Community[] = await response.json();

      setCommunitiesData(communitiesFetchData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllCommunities();
  }, []);

  if (!communitiesData) {
    return <div>Loading...</div>;
  }

  const sortedCommunities = [...communitiesData].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const filteredCommunities =
    query === ""
      ? sortedCommunities
      : sortedCommunities.filter((community) => {
          return community.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="m-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Explore Communities
      </h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
        placeholder="Search community..."
      />
      <div className="grid grid-cols-2 gap-4 mt-4">
        {filteredCommunities.map((community) => (
          <Link
            to={`/community/${community.name}`}
            key={community.id}
            className="border border-gray-200 rounded-md p-2 hover:shadow-md transition-shadow duration-200"
          >
            <img
              src={community.imageUrl}
              alt={`${community.name}`}
              className="h-40 w-full object-cover rounded-md mb-2"
            />
            <div className="text-lg font-bold text-orange-600">
              {community.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExploreCommunities;
