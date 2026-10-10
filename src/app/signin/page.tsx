"use client";

import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);
  const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };
    if (!user.email || !user.password) {
      toast.error("সবগুলো ফিল্ড পূরণ করুন।");
      return;
    }
    setIsLoading(true);
    try {
      const { data, error } = await authClient.signIn.email({
        ...user,
        callbackURL: "/",
      });
      if (error) {
        toast.error(error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।");
        return;
      }
      if (!data) {
        toast.error("সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
        return;
      } else {
        toast.success("সফলভাবে সাইন ইন হয়েছে!");
        router.push("/");
      }
    } catch (error) {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            সাইন ইন করুন
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            আপনার অ্যাকাউন্টে প্রবেশ করে পণ্যের বিস্তারিত দাম দেখুন।
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ইমেইল
              </label>
              <input
                type="email"
                name="email"
                required
                disabled={isLoading}
                placeholder="you@example.com"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                পাসওয়ার্ড
              </label>
              <input
                type="password"
                name="password"
                required
                autoComplete="current-password"
                disabled={isLoading}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="কমপক্ষে ৮ অক্ষর"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading || socialLoading !== null}
              className="group cursor-pointer relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-400"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  সাইন ইন হচ্ছে...
                </>
              ) : (
                "সাইন ইন করুন"
              )}
            </button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">অথবা</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSocialLogin("google")}
              className="w-full inline-flex cursor-pointer justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Sign in with Google</span>
              Google দিয়ে চালিয়ে যান
            </button>
            <button
              onClick={() => handleSocialLogin("github")}
              className="w-full inline-flex justify-center cursor-pointer py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Sign in with Github</span>
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-medium cursor-pointer text-green-600 hover:text-green-500"
            >
              নতুন অ্যাকাউন্ট তৈরি করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
