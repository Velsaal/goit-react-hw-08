import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filters/slice';
import { selectNameFilter } from '../../redux/filters/selectors';
import s from './Filter.module.css'

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  return (
    <div className={s.formContainer}>
      <label className={s.label}>
        Find contacts by name
        <input
          type="text"
          value={filter}
          onChange={e => dispatch(setFilter(e.target.value))}
          className={s.input}
        />
      </label>
    </div>
  );
};
