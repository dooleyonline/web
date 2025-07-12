import ProfileTabsLayout from "@/components/ProfileTabsLayout";

export default function LoginHistoryPage() {
  const dummyLogins = [
    {
      device: "Chrome on Windows",
      ip: "123.123.123.123",
      time: "2024-07-01 14:33",
    },
    {
      device: "Safari on iPhone",
      ip: "192.168.0.4",
      time: "2024-06-29 08:12",
    },
  ];

  return (
    <ProfileTabsLayout>
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Security / Login History</h1>
        <ul className="space-y-4">
          {dummyLogins.map((entry, idx) => (
            <li key={idx} className="p-4 border rounded bg-white shadow-sm">
              <p className="text-gray-800 font-medium">{entry.device}</p>
              <p className="text-sm text-gray-600">IP: {entry.ip}</p>
              <p className="text-sm text-gray-500">Login time: {entry.time}</p>
            </li>
          ))}
        </ul>
      </div>
    </ProfileTabsLayout>
  );
}
