import API from '../../api';
import { useUser } from '../../context/user';
import Button from '../shared/Button';
import Input from '../shared/Input';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  nickname: yup.string().required('Nickname is required'),
});

export default function AccountData() {
  const { user, setUser } = useUser();

  const formik = useFormik({
    initialValues: {
      nickname: user?.nickname,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const res = await API.post(
        'users/update',
        {
          ...user,
          nickname: values.nickname,
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            token:
              JSON.parse(window.localStorage.getItem('walletData') ?? 'null')
                ?.token ?? null,
            signature:
              JSON.parse(window.localStorage.getItem('walletData') ?? 'null')
                ?.signature ?? null,
          },
        }
      );
      setUser({ ...user, ...res.data });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        defaultValue={formik.values.nickname}
        value={formik.values.nickname}
        onChange={formik.handleChange}
        name="nickname"
        placeholder="Nickname"
      />
      <Button>Update</Button>
    </form>
  );
}
