import { useRouter } from "next/router";

const tabs = [
  { name: "My Info", path: "/profile/my-info" },
  { name: "Sales", path: "/profile/sales" },
  { name: "Purchases", path: "/profile/purchases" },
  { name: "Account", path: "/profile/account" },
  { name: "Notification", path: "/profile/notifications" },
  { name: "Security", path: "/profile/security" },
];

const TabMenu: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex space-x-3 overflow-x-auto py-4">
      {tabs.map((tab) => (
        <button
          key={tab.path}
          onClick={() => router.push(tab.path)}
          className={`px-4 py-2 text-sm border-2 rounded transition-all whitespace-nowrap ${
            router.pathname === tab.path
              ? "border-red-500 text-red-600 font-bold"
              : "border-transparent text-gray-600 hover:border-red-300"
          }`}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default TabMenu;
