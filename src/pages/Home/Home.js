import React, { useRef, useState } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { auth, firestore } from "../../firebase";
import { ChatMessage } from "../../components";

export const SignOut = () => {
  return (
    <> 
      {auth.currentUser && (
        <button
          className="border rounded-sm p-2 m-4 flex  hover:bg-gray-100 cursor-pointer"          
          onClick={() => auth.signOut()}
        >
          Sign out
        </button>
      )}
    </>
  );
}

export const Home = () => {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");
  const { uid, photoURL } = auth.currentUser;

  const sendMessage = async (e) => {
    e.preventDefault();

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container mx-auto">
      <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
        <div className="border-r border-gray-300 lg:col-span-1">
        <SignOut />
          <ul className="overflow-auto">
            <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Members</h2>
            <li>
              <div className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                <img
                className="object-cover w-10 h-10 rounded-full"
                alt="User Avatar"
                src={photoURL}
                  />
              </div>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-2 lg:block">
          <div className="w-full">
            <div className="w-full p-2 overflow-y-auto h-full">
              <ul className="space-y-2">
                <li className="flex flex-col">
                  {messages &&
                      messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} />  
                  ))}
                </li>
              </ul>
                <span ref={dummy}></span>
            </div>

            <form onSubmit={sendMessage} className="flex items-center justify-between w-full p-3 border-t border-gray-300">
              <input type="text" placeholder="Message"
                className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message" required 
                value={formValue}
                 onChange={(e) => setFormValue(e.target.value)}
                />
              <button type="submit" disabled={!formValue}>
                <svg className="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
