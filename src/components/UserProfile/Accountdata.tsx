import { useUser } from '../../context/user';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  nickname: yup.string().required('Nickname is required'),
});

export default function AccountData() {
  const { user } = useUser();

  const formik = useFormik({
    initialValues: {
      nickname: user?.nickname,
    },
  validationSchema: validationSchema,
    onSubmit: async (values) => {},
  });

  return <form onSubmit={formik.handleSubmit}></form>;
}
