import API from '../../api';
import { useUser } from '../../context/user';
import Button from '../shared/Button';
import Input from '../shared/Input';
import Tabs from '../shared/Tabs';
import { ChangeEvent, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function InvoiceData() {
  const { user, setUser } = useUser();

  const [activeTab, setActiveTab] = useState(0);
  const [bsData, setBsData] = useState({
    companyName: user?.companyName,
    companyRegNo: user?.companyRegNo,
  });
  const [userData, setUserData] = useState({
    firstname: user?.firstName,
    lastname: user?.lastName,
  });
  const [billingAddress, setBillingAddress] = useState(user?.billingAddress);

  const updateUser = async () => {
    console.log();
    const data = { ...user };
    if (activeTab == 1) {
      if (!!bsData.companyName) data.companyName = bsData.companyName;
      if (!!bsData.companyRegNo) data.companyRegNo = bsData.companyRegNo;
      if (!!billingAddress) data.billingAddress = billingAddress;
    } else {
      if (!!userData.firstname) data.firstName = userData.firstname;
      if (!!userData.lastname) data.lastName = userData.lastname;
      if (!!billingAddress) data.billingAddress = billingAddress;
    }

    const res = await API.post('users/update', data);
    setUser({ ...user, ...res.data });
    toast.success('Profile updates successfully');
  };

  const BussinessData = useMemo(
    () => () => {
      const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;

        setBsData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
      return (
        <div>
          <Input
            type="text"
            name="companyName"
            placeholder="Company name"
            defaultValue={bsData.companyName}
            onChange={onChange}
          />
          <Input
            type="text"
            name="companyRegNo"
            placeholder="Company registry number"
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
          [name]: value,
        }));
      };
      return (
        <div>
          <Input
            type="text"
            name="firstname"
            placeholder="First name"
            defaultValue={userData.firstname}
            onChange={onChange}
          />
          <Input
            type="text"
            name="lastname"
            placeholder="Last name"
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
        type="text"
        name="billingAddress"
        placeholder="Billing address"
        defaultValue={billingAddress}
        onChange={(event) => {
          setBillingAddress(event.target.value);
        }}
      />

      <Button onClick={updateUser}>Update</Button>
    </>
  );
}
