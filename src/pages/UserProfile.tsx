import CustomBox from '../components/shared/CustomBox';
import Title from '../components/shared/Title';
import { useUser } from '../context/user';

export default function UserProfilePage() {
  const { user } = useUser();
  return (
    <>
      <Title>User profile</Title>
      <CustomBox>{user?.nickname}</CustomBox>
    </>
  );
}
