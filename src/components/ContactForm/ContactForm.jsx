import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { addContact } from '../../redux/contacts/operations';
import s from './ContactForm.module.css'; 

const ContactSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  number: Yup.string().required('Required'),
});

export const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

  return (
    <div className={s.formContainer}>
      <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={ContactSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <label className={s.formLabel}>
              Name
              <Field className={s.formInput} name="name" type="text" />
              {errors.name && touched.name && (
                <div className={s.errorMessage}>{errors.name}</div>
              )}
            </label>

            <label className={s.formLabel}>
              Number
              <Field className={s.formInput} name="number" type="tel" />
              {errors.number && touched.number && (
                <div className={s.errorMessage}>{errors.number}</div>
              )}
            </label>

            <button className={s.submitButton} type="submit">Add contact</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
