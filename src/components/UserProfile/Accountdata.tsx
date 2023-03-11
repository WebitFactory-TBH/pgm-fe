import { useUser } from '../../context/user';
import Input from '../shared/Input';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  nickname: yup.string().required('Nickname is required')
});

export default function AccountData() {
  const { user } = useUser();

  const formik = useFormik({
    initialValues: {
      nickname: user?.nickname
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {}
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        defaultValue={formik.values.nickname}
        value={formik.values.nickname}
        onChange={formik.handleChange}
        name='nickname'
        placeholder='Nickname'
      />
    </form>
  );
}
