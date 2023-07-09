import { useNavigate } from "react-router-dom";
import { HeaderMenuLogged, HeaderMenuNotLogged } from "..";
import { useStore } from "../../store/zustandStore";

const Header = () => {
  const { logged } = useStore();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between bg-orange-400 p-2">
      <div
        className="flex items-center justify-center font-bold text-2xl font-logotext mt-2 cursor-pointer"
        onClick={() => {
          navigate("");
        }}
      >
        Reedit
      </div>
      <div>{!logged ? <HeaderMenuNotLogged /> : <HeaderMenuLogged />}</div>
    </div>
  );
};

export default Header;
