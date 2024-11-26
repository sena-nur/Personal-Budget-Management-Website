export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface TabProps {
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

export default function Tab({ tabs, activeTab, onTabChange }: TabProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex -mb-px">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={`py-2 px-4 border-b-2 ${
              activeTab === index
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => onTabChange(index)}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
}
