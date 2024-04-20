/* profile page

  - user's profile picture
  - user's name
  - user's email
  - user's phone number
  - user's address
  - user's wing
  - user's society
  - user's role
  - user's status
  - user's account created date
  - user's account updated date
  - edit profile button
  - change password button
  - delete account button
  - logout button
  - back button
  


*/

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  // Dummy user data (replace with actual data from Redux state or API)
  // const user = {
  //   name: 'John Doe',
  //   email: 'johndoe@example.com',
  //   phone: '123-456-7890',
  //   address: '123 Main St, City, Country',
  //   wing: 'A',
  //   society: 'XYZ Society',
  //   role: 'Member',
  //   status: 'Active',
  //   createdAt: '01/01/2023',
  //   updatedAt: '03/15/2023',
  //   profilePicture: 'path/to/profile-picture.jpg',
  // };

  const { user } = useSelector((state) => state.user);

  const handleEditProfile = () => {
    // Handle edit profile action
  };

  const handleChangePassword = () => {
    // Handle change password action
  };

  const handleDeleteAccount = () => {
    // Handle delete account action
  };

  const handleLogout = () => {
    // Handle logout action
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">User Profile</h1>
        <Link to="/dashboard" className="btn btn-primary">
          Back
        </Link>
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p>
            <span className="font-semibold">Phone:</span> {user.contact}
          </p>
          <p>
            <span className="font-semibold">Address:</span> {user.address}
          </p>
          <p>
            <span className="font-semibold">Wing:</span> {user.wingId}
          </p>
          <p>
            <span className="font-semibold">Society:</span> {user.societyId}
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold">Role:</span> {user.role}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {user.status}
          </p>
          <p>
            <span className="font-semibold">Account Created:</span>{" "}
            {user.createdAt}
          </p>
          <p>
            <span className="font-semibold">Account Updated:</span>{" "}
            {user.updatedAt}
          </p>
        </div>
      </div>
      <div className="mt-8 flex space-x-4">
        <Button onClick={handleEditProfile}>Edit Profile</Button>
        <Button onClick={handleChangePassword}>Change Password</Button>
        <Button onClick={handleDeleteAccount}>Delete Account</Button>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
};

export default ProfilePage;
