"use client";

import React, { useState } from "react";

interface UserData {
  login: string;
  followers: string;
  following: string;
  avatar_url: string;
  public_repos: string;
  name: string;
  created_at: string;
  updated_at: string;
  location: string;
  id: null;
  followers_url: string;
  following_url: string;
  repos_url: string;
}

export default function GithubData() {
  const [userName, setUserName] = useState("");
  const [click, setClick] = useState(false);
  const [data, setData] = useState<UserData>({
    login: "",
    followers: "",
    following: "",
    avatar_url: "",
    public_repos: "",
    name: "",
    created_at: "",
    updated_at: "",
    location: "",
    id: null,
    followers_url: "",
    following_url: "",
    repos_url: "",
  });
  const [followers, setFollowers] = useState<any[]>([]);
  const [followings, setFollowings] = useState<any[]>([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowings, setShowFollowings] = useState(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const onClickHandler = async () => {
    try {

      setClick(true);
      setFollowers([]);
      setFollowings([]);
      setShowFollowers(false);
      setShowFollowings(false);
      const response = await fetch(`https://api.github.com/users/${userName}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user followers data");
      }
      const userData = await response.json();
      setData(userData);
    } catch (error) {
      console.error("Error fetching user followers data:", error);
    }


  };
  

  const onClickFollowers = async () => {
    try {
      setShowFollowers(true);
      setShowFollowings(false);
      const response = await fetch(data.followers_url);
      if (!response.ok) {
        throw new Error("Failed to fetch user followers data");
      }
      const userFollowersData = await response.json();
      setFollowers(userFollowersData);
    } catch (error) {
      console.error("Error fetching user followers data:", error);
    }
  };

  const onClickFollowing = async () => {
    try {
      setShowFollowers(false);
      setShowFollowings(true);
      const response = await fetch(
        `https://api.github.com/users/${userName}/following`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch user following data: ${response.status} - ${response.statusText}`
        );
      }
      const userFollowingData = await response.json();
      setFollowings(userFollowingData);
    } catch (error) {
      console.error("Error fetching user following data:", error);
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-black dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <svg
              className="w-8 h-8 text-yellow-600 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z" />
            </svg>
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-yellow-600 dark:text-white">
              GitHub User
            </span>
          </a>

          <div
   
        className="text-2xl font-semibold  text-black bg-yellow-600 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
        >
       Kanwal Heer
      </div>

        </div>

      </nav>

      {/* User Data Display */}
      <div>
        <h1 className="mt-20 text-center text-4xl text-black-500 m-8 p-8 font-bold">
          GitHub User Data
        </h1>
        <form className="max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-black"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              onChange={onChangeHandler}
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-o5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-yellow-500 dark:focus:border-yellow-500"
              placeholder="Enter User Name"
            />
            <button
              onClick={onClickHandler}
              type="submit"
              className="text-black absolute end-2.5 bottom-2.5 bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
            >
              Search
            </button>
          </div>
        </form>

        {Object.keys(data).length > 0 && (
          <div className="flex justify-center mt-20">
            {click && (
              <div className="max-w-sm bg-black border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center p-5 text-yellow-700">
                <img src={data.avatar_url} alt="" />
                <h1>ID : {data.id}</h1>
                <h1>User Name : {data.login}</h1>
                <h1>Name : {data.name}</h1>
                <h1>Followers : {data.followers}</h1>
                <h1>Followings : {data.following}</h1>
                <h1> Public Repos : {data.public_repos}</h1>
                <h1>Created_At : {data.created_at}</h1>
                <h1>Updated_At : {data.updated_at}</h1>
                <h1>Location : {data.location}</h1>
              </div>
            )}
          </div>
        )}

        {/* Display Followers or Followings */}
        {click && (
          <div>
            <div className="flex justify-center mt-10 space-x-6">
              <button
                onClick={onClickFollowers}
                className="text-yellow-700 bg-black py-2 px-3 rounded"
              >
                Followers
              </button>
              <button
                onClick={onClickFollowing}
                className="text-yellow-700 bg-black py-2 px-3 rounded"
              >
                Following
              </button>
            </div>

            <div>
              {showFollowers ? (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
                  <table className="w-full text-sm text-left rtl:text-right text-yellow-100 dark:text-yellow-100">
                    <thead className="text-xs text-yellow-600 uppercase bg-black border-b border-black dark:text-yellow-600">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Profile Picture
                        </th>
                        <th scope="col" className="px-6 py-3">
                          User Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          ID
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {followers.map((follower) => (
                        <tr
                          key={follower.id}
                          className="bg-yellow-600 border-b border-yellow-400 hover:bg-yellow-500"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-yellow-100"
                          >
                            <img
                              src={follower.avatar_url}
                              height={100}
                              width={100}
                              alt=""
                            />
                          </th>
                          <td className="px-6 py-4 text-black">
                            {follower.login}
                          </td>
                          <td className="px-6 py-4 text-black">
                            {follower.id}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
                  <table className="w-full text-sm text-left rtl:text-right text-yellow-100 dark:text-yellow-100">
                    <thead className="text-xs text-yellow-600 uppercase bg-black border-b border-black dark:text-yellow-600">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Profile Picture
                        </th>
                        <th scope="col" className="px-6 py-3">
                          User Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          ID
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {followings.map((following) => (
                        <tr
                          key={following.id}
                          className="bg-yellow-600 border-b border-yellow-400 hover:bg-yellow-500"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-yellow-100"
                          >
                            <img
                              src={following.avatar_url}
                              height={100}
                              width={100}
                              alt=""
                            />
                          </th>
                          <td className="px-6 py-4 text-black">
                            {following.login}
                          </td>
                          <td className="px-6 py-4 text-black">
                            {following.id}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
