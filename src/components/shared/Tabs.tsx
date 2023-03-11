interface TabsI {
  tabs: string[];
  style?: string;
  activeTab: number;
  setActiveTab: (index: number) => void;
}

export default function Tabs({ tabs, activeTab, setActiveTab, style }: TabsI) {
  return (
    <div className="flex">
      {tabs.map((tab: string, index: number) => {
        return (
          <div
            onClick={() => setActiveTab(index)}
            className={
              'rounded-md bg-[#f9f9f9] transition-all hover:bg-gray-200 px-3 py-1 mr-2 ' +
              style
            }
          >
            {tab}
          </div>
        );
      })}
    </div>
  );
}
