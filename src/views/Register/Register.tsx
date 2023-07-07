import { useState } from "react";
import { useStore } from "../../store/zustandStore";
import { baseBackendURL } from "../../config/globals";
import { Modal } from "../../components";

const Register = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register(username: string, email: string, password: string) {
    try {
      const response = await fetch(`${baseBackendURL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const registerData = await response.json();

      if (registerData.message === "The email you provided already exists") {
        setModalTitle("Error");
        setModalContent(registerData.message);
        setIsModalOpen(true);
        return;
      }

      if (registerData.message === "The username you provided already exists") {
        setModalTitle("Error");
        setModalContent(registerData.message);
        setIsModalOpen(true);
        return;
      }

      setModalTitle("Success");
      setModalContent("¡Welcome to Reedit!");
      setIsModalOpen(true);
    } catch (error) {
      setModalTitle("Error");
      setModalContent("Servers are currently down");
      setIsModalOpen(true);
    }
  }

  return (
    <div className="m-8">
      <div className="flex flex-col max-w-md p-6 bg-white rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold text-orange-600">Register</h1>
          <p className="text-sm text-gray-500">
            Create communities, posts and comments!
          </p>
        </div>
        <form noValidate action="" className="space-y-12">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm text-gray-500"
              >
                Username
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="BigChinchilla700"
                className="w-full px-3 py-2 border border-orange-400 rounded-md bg-orange-50 text-orange-700"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
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
                className="w-full px-8 py-3 font-semibold text-white rounded-md bg-orange-600 hover:bg-orange-700"
                onClick={() => {
                  register(username, email, password)
                    .then(() => {})
                    .catch(() => {});
                }}
              >
                Register
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

export default Register;
