import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import Menu, { MenuItem } from './Menu';
import SuggestAccount, { AccountItem } from '~/components/SuggestAccout/SuggestAccount';
import config from '~/config';
import { DeleteOutlined } from '@ant-design/icons';  // Import icon thùng rác
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHouse,
    faUserGroup,
    faUser,
    faPlay
} from '@fortawesome/free-solid-svg-icons';
function SidebarAdmin() {
    const cx = classNames.bind(styles);
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="User" to='/admin/user'>
                    <FontAwesomeIcon icon={faUser} />
                </MenuItem>
                <MenuItem title="Khôi phục user" to='/admin/user/restore'>
                    <DeleteOutlined />
                </MenuItem>
                <MenuItem title="Video" to='/admin/allVideo'>
                    <FontAwesomeIcon icon={faPlay} />
                </MenuItem>
            </Menu>

        </aside>
    );
}
export default SidebarAdmin;
