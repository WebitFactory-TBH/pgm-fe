import Button from '../shared/Button';
import Input from '../shared/Input';
import Tabs from '../shared/Tabs';
import { ChangeEvent, useMemo, useState } from 'react';

export default function InvoiceData() {
  const [activeTab, setActiveTab] = useState(0);
  const [bsData, setBsData] = useState({
    companyName: '',
    companyRegNo: ''
  });
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: ''
  });
  const [billingAddress, setBillingAddress] = useState('');

  const BussinessData = useMemo(
    () => () => {
      const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;

        setBsData((prev) => ({
          ...prev,
          [name]: value
        }));
      };
      return (
        <div>
          <Input
            type='text'
            name='companyName'
            placeholder='Company name'
            defaultValue={bsData.companyName}
            onChange={onChange}
          />
          <Input
            type='text'
            name='companyRegNo'
            placeholder='Company registry number'
            defaultValue={bsData.companyRegNo}
            onChange={onChange}
          />
        </div>
      );
    },
    []
  );

  const UserData = useMemo(
    () => () => {
      const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;

        setUserData((prev) => ({
          ...prev,
          [name]: value
        }));
      };
      return (
        <div>
          <Input
            type='text'
            name='firstname'
            placeholder='First name'
            defaultValue={userData.firstname}
            onChange={onChange}
          />
          <Input
            type='text'
            name='lastname'
            placeholder='Last name'
            defaultValue={userData.lastname}
            onChange={onChange}
          />
        </div>
      );
    },
    []
  );

  return (
    <>
      <Tabs
        tabs={['Individual', 'Company']}
        setActiveTab={(tab) => {
          setActiveTab(tab);
        }}
        activeTab={activeTab}
      />
      {activeTab ? <BussinessData /> : <UserData />}
      <Input
        type='text'
        name='billingAddress'
        placeholder='Billing address'
        defaultValue={billingAddress}
        onChange={(event) => {
          setBillingAddress(event.target.value);
        }}
      />

      <Button>Update</Button>
    </>
  );
}
