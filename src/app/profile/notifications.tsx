import ProfileTabsLayout from "@/components/ProfileTabsLayout";

export default function NotificationSettingsPage() {
  return (
    <ProfileTabsLayout>
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Notification Settings</h1>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Email Notifications</h2>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" defaultChecked />
            <span>Receive new messages and purchase-related emails</span>
          </label>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Receive event-related information</h2>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" />
            <span>Receive event and discount information by email</span>
          </label>
        </section>
      </div>
    </ProfileTabsLayout>
  );
}