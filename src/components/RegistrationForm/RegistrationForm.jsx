import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register } from '../../redux/auth/operations';
import { toast } from 'react-hot-toast';
import s from './RegistrationForm.module.css'; 

const registerSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Email не підходить').required('Required'),
  password: Yup.string().min(6, 'Сильно короткий пароль').required('Required'),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    try {
      const action = await dispatch(register(values));
      if (register.fulfilled.match(action)) {
        toast.success('Реєстрація успішна!');
        actions.resetForm();
      } else {
        toast.error('Користувач з таким email вже існує!');
      }
    } catch (error) {
      toast.error('Щось не так, спробуйте пізніше.');
      console.error(error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className={s.formContainer}>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off">
            <label className={s.formLabel}>
              Username
              <Field className={s.formInput} type="text" name="name" />
              <ErrorMessage name="name" component="div" className={s.errorMessage} />
            </label>

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
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
