"use client";

import Image from "next/image";
import { authClient } from "../lib/auth-client";
import { LogOut } from "lucide-react";
import Link from "next/link";

const ProfilePage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">আমার প্রোফাইল</h1>
        <p className="text-gray-600 mb-8">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
        {/* ইউজার ইনফো কার্ড */}
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-16 rounded-full ring-2 ring-green-500 ring-offset-2">
                <Image
                  width={100}
                  height={100}
                  src={(user?.image as string) || "/default-avatar.png"}
                  alt="User Avatar"
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {user?.name}
              </h2>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>
          {/* /* সাইন আউট বাটন (ঐচ্ছিক) * */}
          <button className="btn btn-outline btn-error btn-sm">
            <LogOut className="w-4 h-4 mr-2" />
            সাইন আউট
          </button>
        </div>
        {/* আপডেট সেকশন */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            নাম হালনাগাদ করুন
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            আপনার নাম পরিবর্তন করতে নিচের বাটনে ক্লিক করুন।
          </p>
          <Link
            href="/profile/update"
            className="btn bg-green-600 p-4 rounded-md hover:bg-green-700 text-white border-none"
          >
            তথ্য আপডেট করুন
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
