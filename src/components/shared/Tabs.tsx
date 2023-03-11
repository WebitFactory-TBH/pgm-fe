interface TabsI {
  tabs: string[];
  style?: string;
  activeTab: number;
  setActiveTab: (index: number) => void;
}

export default function Tabs({ tabs, activeTab, setActiveTab, style }: TabsI) {
  return (
    <div className="flex">
      {tabs.map((tab: string, index: any) => {
        return (
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            className={
              'my-2 mr-2 block min-w-[120px] rounded  px-6 pt-4 pb-3.5 text-center text-xs font-medium uppercase leading-tight md:mr-4 select-none cursor-pointer transition-all ' +
              (activeTab === index
                ? 'bg-blue-100 text-blue-700'
                : 'bg-neutral-100 text-neutral-500 ')
            }
          >
            {tab}
          </div>
        );
      })}
    </div>
  );
}
