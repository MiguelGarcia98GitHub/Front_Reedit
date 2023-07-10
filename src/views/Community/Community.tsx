import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { CommunityTopBar } from "../../components";
import {
  Community as CommunityInterface,
  Post,
} from "../../interfaces/interfaces";
import CommunityPostsList from "../../components/CommunityPostsList/CommunityPostsList";
import NotFound from "../NotFound/NotFound";

const Community = () => {
  const [empty404, setEmpty404] = useState<number>(1); // 1: Loading / 2: Correctly Loaded / 3: Empty

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

      if (communityNameFetchData.statusCode) {
        setEmpty404(3);
        return;
      }

      setEmpty404(2);

      setCommunityNameData(communityNameFetchData);
      return communityNameFetchData;
    } catch (error) {}
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
    fetchCommunityData().then((communityDataPossibleError) => {});
  }, []);

  useEffect(() => {
    fetchCommunityPosts();
  }, [communityNameData]);

  return (
    <div className="justify-center align-middle">
      {empty404 === 2 && communityNameData && (
        <CommunityTopBar community={communityNameData} />
      )}
      {empty404 === 2 && communityPostsData && (
        <CommunityPostsList posts={communityPostsData} />
      )}
      {empty404 === 3 && <NotFound errorMessage="Community not found" />}
    </div>
  );
};

export default Community;
