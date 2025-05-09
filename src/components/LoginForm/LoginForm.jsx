import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { logIn } from '../../redux/auth/operations';
import { toast } from 'react-hot-toast';
import s from './LoginForm.module.css'; 

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    try {
      const action = await dispatch(logIn(values));
      if (logIn.fulfilled.match(action)) {
        toast.success('Успішний вхід!');
        actions.resetForm();
      } else {
        toast.error('Неправильний email або пароль');
      }
    } catch (error) {
      toast.error('Помилка входу. Спробуйте пізніше.');
      console.error(error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className={s.formContainer}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off">
            <label className={s.formLabel}>
              Email
              <Field className={s.formInput} type="email" name="email" />
              <ErrorMessage name="email" component="div" className={s.errorMessage} />
            </label>

            <label className={s.formLabel}>
              Password
              <Field className={s.formInput} type="password" name="password" />
              <ErrorMessage name="password" component="div" className={s.errorMessage} />
            </label>

            <button className={s.submitButton} type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Log In'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
