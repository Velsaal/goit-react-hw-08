import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, selectNameFilter } from '../../redux/filtersSlice';
import styles from './Filter.module.css'

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  return (
    <label>
      Find contacts by name:
      <input className={styles.input}
        type="text"
        value={filter}
        onChange={e => dispatch(changeFilter(e.target.value))}
      />
    </label>
  );
}
