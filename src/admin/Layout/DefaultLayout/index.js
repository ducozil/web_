import Header from '../components/Header';
import SidebarAdmin from './Sidebar';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);
function DefaultLayoutAdmin({ children }) {
    return (
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <SidebarAdmin />
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
        </div>
    );
}
export default DefaultLayoutAdmin;
