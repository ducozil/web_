import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
const cx = classNames.bind(styles);
function MenuItem({ title, to, children }) {
    return (
        <NavLink to={to}  className={(nav)=>cx('menu-item',{active: nav.isActive})}>
            <button className={cx('icon')}>{children}</button>
            <span className={cx('title')}>{title}</span>
        </NavLink>
    );
}
export default MenuItem;
