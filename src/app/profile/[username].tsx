import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProfileTabsLayout from "@/components/ProfileTabsLayout";
import { apiFetch } from "@/lib/api/core/client";

export default function ProfilePage() {
  const router = useRouter();
  const { username } = router.query;

  const [me, setMe] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  useEffect(() => {
    if (!username) return;

    Promise.all([
      apiFetch("/api/users/me"),
      apiFetch(`/api/users/${username}`),
    ])
      .then(([meRes, profileRes]) => {
        if (!meRes.ok || !meRes.data || !profileRes.ok || !profileRes.data) {
          throw new Error(meRes.error?.message || profileRes.error?.message || "Failed to fetch user profile.");
        }
        setMe(meRes.data);
        setUserProfile(profileRes.data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [username]);

  if (isLoading || !userProfile) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  const isOwner = me?.username === username;

  const handleEditClick = () => {
    setNickname(userProfile.nickname);
    setProfileImageUrl(userProfile.profileImageUrl);
    setIsEditing(true);
  };

  const handleSave = async () => {
    const result = await apiFetch(`/api/users/me`, {
      method: "PUT",
      data: { nickname, profileImageUrl },
      headers: { "Content-Type": "application/json" },
    });

    if (!result.ok || !result.data) {
      alert(result.error?.message || "Failed to update profile.");
    } else {
      setUserProfile(result.data);
      setIsEditing(false);
    }
  };

  return (
    <ProfileTabsLayout>
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          {userProfile.nickname}'s Profile
        </h1>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nickname
              </label>
              <input
                className="w-full border border-gray-300 px-4 py-2 rounded"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Image URL
              </label>
              <input
                className="w-full border border-gray-300 px-4 py-2 rounded"
                value={profileImageUrl}
                onChange={(e) => setProfileImageUrl(e.target.value)}
              />
            </div>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Save
            </button>
          </div>
        ) : (
          <>
            <img
              src={userProfile.profileImageUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4"
            />
            {isOwner ? (
              <button
                onClick={handleEditClick}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Edit Profile
              </button>
            ) : (
              <p className="text-gray-500">Viewing this user's profile.</p>
            )}
          </>
        )}
      </div>
    </ProfileTabsLayout>
  );
}