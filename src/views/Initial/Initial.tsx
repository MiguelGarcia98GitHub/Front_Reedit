import { RandomPostsList } from "../../components";
import { useStore } from "../../store/zustandStore";

const Initial = () => {
  const { logIn } = useStore();

  return (
    <div>
      <RandomPostsList />
    </div>
  );
};

export default Initial;
