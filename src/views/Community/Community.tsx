import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseBackendURL } from "../../config/globals";
import { CommunityTopBar, Modal } from "../../components";
import {
  Community as CommunityInterface,
  Post,
} from "../../interfaces/interfaces";
import CommunityPostsList from "../../components/CommunityPostsList/CommunityPostsList";

const Community = () => {
  const [communityNameData, setCommunityNameData] =
    useState<CommunityInterface | null>(null);
  const [communityPostsData, setCommunityPostsData] = useState<Post[] | null>(
    null
  );

  const { communityName } = useParams();
  async function fetchCommunityData() {
    try {
      const response = await fetch(
        `http://localhost:3000/communities/communityName/${communityName}`
      );

      const communityNameFetchData = await response.json();

      setCommunityNameData(communityNameFetchData);
    } catch (error) {
      // TODO
    }
  }

  async function fetchCommunityPosts() {
    try {
      const response = await fetch(
        `http://localhost:3000/posts/communityName/${communityName}`
      );

      const communityPostsFetchData = await response.json();
      console.log("communityPostsFetchData:");
      console.log(communityPostsFetchData);

      setCommunityPostsData(communityPostsFetchData);
    } catch (error) {
      // TODO
    }
  }

  useEffect(() => {
    fetchCommunityData().then(() => {
      fetchCommunityPosts();
    });
  }, []);

  return (
    <div>
      {communityNameData && <CommunityTopBar community={communityNameData} />}
      {communityPostsData && <CommunityPostsList posts={communityPostsData} />}
    </div>
  );
};

export default Community;
