import { useRouter } from "next/router";
import ProfileTabsLayout from "@/components/ProfileTabsLayout";

export default function AccountSettingsPage() {
  const router = useRouter();

  const handleDeleteAccount = () => {
    const confirmed = confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmed) {
      alert("Your account has been deleted.");
      router.push("/");
    }
  };

  return (
    <ProfileTabsLayout>
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Change Password</h2>
          <p className="text-sm text-gray-500 mb-2">
            Password changes are processed through email authentication for security reasons.
          </p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Request a password change link
          </button>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2 text-red-600">계정 삭제</h2>
          <p className="text-sm text-gray-500 mb-2">
            If you delete your account, all your data will be lost and cannot be recovered.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete Account
          </button>
        </section>
      </div>
    </ProfileTabsLayout>
  );
}