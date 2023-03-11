import AccountData from '../components/UserProfile/Accountdata';
import ConnectedWallets from '../components/UserProfile/ConnectedWallets';
import InvoiceData from '../components/UserProfile/InvoiceData';
import CustomBox from '../components/shared/CustomBox';
import Tabs from '../components/shared/Tabs';
import Title from '../components/shared/Title';
import { useState } from 'react';

const tabs = ['Account data', 'Invoice data', 'Connected Wallets'];

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const renderActiveTab = (index: number) => {
    switch (index) {
      case 0:
        return <AccountData />;
      case 1:
        return <InvoiceData />;
      case 2:
        return <ConnectedWallets />;
    }
  };

  return (
    <>
      <Title>User profile</Title>
      <Tabs
        style="mt-4"
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <CustomBox>{renderActiveTab(activeTab)}</CustomBox>
    </>
  );
}
