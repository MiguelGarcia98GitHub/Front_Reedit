import { useState } from "react";
import { Modal, Spinner } from "../../components";
import { useStore } from "../../store/zustandStore";
import { useNavigate } from "react-router-dom";
import { delay } from "../../helpers/helpers";

const LogIn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { logIn } = useStore();
  const navigate = useNavigate();

  return (
    <div className="m-8">
      <div className="flex flex-col max-w-md p-6 bg-white rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold text-orange-600">Log In</h1>
          <p className="text-sm text-gray-500">
            Access your communities, posts and comments!
          </p>
        </div>
        <form noValidate action="" className="space-y-12">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm text-gray-500"
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="someone@email.com"
                className="w-full px-3 py-2 border border-orange-400 rounded-md bg-orange-50 text-orange-700"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm text-gray-500">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*******"
                className="w-full px-3 py-2 border border-orange-400 rounded-md bg-orange-50 text-orange-700"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button
                type="button"
                className="h-12 w-full px-8 py-3 font-semibold text-white rounded-md bg-orange-600 hover:bg-orange-700"
                onClick={() => {
                  setLoading(true);
                  logIn(email, password)
                    .then(async (data) => {
                      setLoading(false);

                      if ("message" in data) {
                        if (data.message === "Email was not found") {
                          // Activate modal with parameters for 'Email was not found'
                          setModalTitle("Error");
                          setModalContent("Email was not found");
                          setIsModalOpen(true);
                          return;
                        }

                        if (data.message === "Password does not match") {
                          setModalTitle("Error");
                          setModalContent("Password does not match");
                          setIsModalOpen(true);
                          return;
                        }
                      }

                      navigate("/");
                    })
                    .catch(async () => {
                      setLoading(false);
                      setModalTitle("Error");
                      setModalContent("Servers are currently down");
                      setIsModalOpen(true);
                    });
                }}
              >
                <div className="flex justify-center items-center">
                  {!loading ? "Log In" : <Spinner />}
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
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

export default LogIn;
