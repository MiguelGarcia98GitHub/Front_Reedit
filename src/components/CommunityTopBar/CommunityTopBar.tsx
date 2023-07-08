import React from "react";
import { useNavigate } from "react-router-dom";

interface Community {
  id: number;
  name: string;
  imageUrl: string;
}

interface CommunityTopBarProps {
  community: Community;
}

const CommunityTopBar: React.FC<CommunityTopBarProps> = ({ community }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center bg-gray-400 p-4 rounded-md"
      onClick={() => {
        navigate(`/community/${community.name}`);
      }}
    >
      <img
        src={community.imageUrl}
        alt="Community Logo"
        className="w-12 h-12 rounded-full mr-2"
      />
      <h1 className="font-bold text-lg">{community.name}</h1>
    </div>
  );
};

export default CommunityTopBar;
