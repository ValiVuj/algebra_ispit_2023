
  import React from "react";

  import firebase from "firebase/compat/app";
  import "firebase/compat/firestore";
  import "firebase/compat/auth";

  import { auth } from "../../firebase";
  import { Logo } from "../../components";
  
export const SignIn = () => {

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
      };
      
    return (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-md">
          <Logo />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">  
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">Using Google</span>
                  </div>
                </div>
  
                <div className="mt-6 grid grid-cols-1 gap-3">
                  <div>
                    <button
                      onClick={signInWithGoogle}
                      className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                    >
                      <span >Sign in with Google</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
