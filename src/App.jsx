import { useState } from "react";
import "./css/App.css";

// Components
import Navbar from "./components/Navbar";

import { UilGithub, UilTwitter } from "@iconscout/react-unicons";

function handleClickTwitter() {
  window.location.href = "https://twitter.com/JereKane22";
}

function handleClickGithub() {
  window.location.href = "https://github.com/Jkane22";
}

function App() {
  const [contacts, setContacts] = useState([]);

  // Contact Info
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");

  // Checking if contact already exists
  const checkContact = contacts.find((contact) => contact.number === number);

  const SetInfo = () => {
    if (checkContact) {
      setError("Contact already exists");
      setTimeout(() => {
        setError("");
      }, 3500);
      return;
    }

    setContacts([
      ...contacts,
      { name, number, id: Math.floor(Math.random() * 1000) },
    ]);
    setName("");
    setNumber("");
  };

  const formatPhoneNumber = (phoneNumber) => {
    // Remove all non-digit characters
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");

    // Format the cleaned phone number string with the desired format
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return phoneNumber;
  };

  // Disable submit button if name or number is empty and if the number is long enough (10 digits) and if its too long (more than 10 digits)
  const disableSubmit =
    name === "" ||
    number === "" ||
    number.length < 10 ||
    formatPhoneNumber(number).length < 10;

  return (
    <div className="App bg-slate-100 min-h-screen">
      <Navbar />
      <div className="bg-white w-auto my-10 mx-10 rounded-xl flex text-black font-black text-2xl">
        <h1 className="my-7 ml-7 lg:block hidden">Name:</h1>
        <input
          className="input my-5 mx-2 w-full lg:block hidden bg-transparent text-2xl"
          type="text"
          placeholder="Person's Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <h1 className="my-7 ml-7 lg:block hidden">Number:</h1>
        <input
          className="input my-5 mx-2 lg:block hidden bg-transparent text-2xl"
          type="tel"
          placeholder="(XXX) XXX-XXXX"
          onChange={(e) => setNumber(e.target.value)}
          value={formatPhoneNumber(number)}
        />
        <button
          className={
            disableSubmit
              ? "btn btn-success opacity-30 btn-disabled btn-md my-5 mx-2 lg:block hidden"
              : "btn btn-success btn-md my-5 mx-2 lg:block hidden"
          }
          onClick={SetInfo}
        >
          Add
        </button>

        {/* Small Screen */}
        <div className="lg:hidden w-full mr-5">
          <label className="block my-5 ml-7 font-black text-2xl">
            Name:
            <input
              className="input my-2 w-full bg-transparent text-2xl block"
              type="text"
              placeholder="Person's Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </label>
          <label className="block my-5 ml-7 font-black text-2xl">
            Number:
            <input
              className="input my-2 bg-transparent text-2xl block w-full"
              type="tel"
              placeholder="(XXX) XXX-XXXX"
              onChange={(e) => setNumber(e.target.value)}
              value={formatPhoneNumber(number)}
            />
          </label>
          <button
            className={
              disableSubmit
                ? "btn btn-success btn-block opacity-30 btn-disabled btn-md my-5 mx-2"
                : "btn btn-success btn-block btn-md my-5 mx-3 block"
            }
            onClick={SetInfo}
          >
            Add
          </button>
        </div>
      </div>

      <h1 className="font-black text-3xl text-center text-black pt-5">
        Contacts List
      </h1>
      {contacts && contacts.length === 0 ? (
        <div className="bg-white w-auto my-10 mx-10 rounded-xl">
          <h1 className="font-black text-xl text-center text-black p-5">
            Hmm, Seems empty... Try adding some contacts
          </h1>
        </div>
      ) : (
        <div className="bg-white w-auto my-10 mx-10 rounded-xl">
          {contacts.map((contact, index) => (
            <div className="flex flex-col">
              <h1 className="font-black text-black my-2 mx-2 text-xl">
                {contact.name} - {formatPhoneNumber(contact.number)}
                <button
                  className="btn btn-error btn-sm float-right"
                  onClick={() =>
                    setContacts(contacts.filter((_, i) => i !== index))
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-x"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  Delete
                </button>
              </h1>
            </div>
          ))}
        </div>
      )}
      {error && (
        <div className="bg-white w-auto my-10 mx-10 rounded-xl absolute bottom-0 right-0 border border-red-600">
          <h1 className="font-black text-red-600 mt-2 mx-3">Error:</h1>
          <h1 className="font-black text-black my-2 mx-3 text-xl">{error}</h1>
        </div>
      )}
      <footer className="footer items-center p-5 text-neutral-content absolute bottom-0">
        <div className="items-center grid-flow-col">
          <p>
            Created with ❤️ by: <span className="font-bold">Jkane22</span>
          </p>
        </div>
        <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a
            className="hover:scale-125 duration-200"
            onClick={handleClickTwitter}
          >
            <UilTwitter />
          </a>
          <a
            className="hover:scale-125 duration-200"
            onClick={handleClickGithub}
          >
            <UilGithub />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
