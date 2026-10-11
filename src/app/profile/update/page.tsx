"use client";
import { authClient } from "@/app/lib/auth-client";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const UpdateProfilePage = () => {
  const router = useRouter();
  const { data: session, refetch } = authClient.useSession();
  const user = session?.user;

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    image: user?.image || "",
  });
  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const loadingToast = toast.loading("প্রোফাইল আপডেট করা হচ্ছে...");

    try {
      // শুধুমাত্র পরিবর্তিত ডেটা পাঠানো ভালো, তবে এখানে সম্পূর্ণ অবজেক্ট পাঠানো হচ্ছে
      const { data, error } = await authClient.updateUser({
        name: formData.name,
        image: formData.image || undefined,
      });
      if (error) {
        toast.error(error.message || "প্রোফাইল আপডেট করা যায়নি", {
          id: loadingToast,
        });
      } else {
        toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!", { id: loadingToast });
        await refetch(); // সেশন রিফ্রেশ করা জরুরি
        router.push("/profile"); // প্রোফাইল পেজে ফিরে যান
      }
    } catch (error) {
      toast.error("একটি অপ্রত্যাশিত ত্রুটি ঘটেছে", { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
        {/* ব্যাক বাটন */}
        <Link
          href="/profile"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          প্রোফাইলে ফিরে যান
        </Link>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          তথ্য হালনাগাদ করুন
        </h2>
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          {/* নাম ইনপুট */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              নাম
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="input input-bordered w-full focus:ring-2 focus:ring-green-500"
              placeholder="আপনার নাম লিখুন"
            />
          </div>
          {/* ইমেজ URL ইনপুট (ঐচ্ছিক) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL (ঐচ্ছিক)
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="input input-bordered w-full focus:ring-2 focus:ring-green-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          {/* সাবমিট বাটন */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn w-full bg-green-600 hover:bg-grren-700 text-white border-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                আপডেট হচ্ছে...
              </>
            ) : (
              "তথ্য আপডেট করুন"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
export default UpdateProfilePage;
