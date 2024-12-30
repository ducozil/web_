import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import Menu, { MenuItem } from './Menu';
import SuggestAccount,{AccountItem} from '~/components/SuggestAccout/SuggestAccount';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHouse,
    faUserGroup,
    faVideo,
} from '@fortawesome/free-solid-svg-icons';
function Sidebar() {
    const cx = classNames.bind(styles);
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For you" to={config.routes.home}>
                    <FontAwesomeIcon icon={faHouse} />
                </MenuItem>
                <MenuItem title="Following" to={config.routes.following}>
                    <FontAwesomeIcon icon={faUserGroup} />
                </MenuItem>
                <MenuItem title="Live" to={config.routes.live}>
                    <FontAwesomeIcon icon={faVideo} />
                </MenuItem>
            </Menu>
            <SuggestAccount>
                <h>Suggested Accounts</h>
            </SuggestAccount>
            <SuggestAccount>
                <h>Folowing Acounts</h>
            </SuggestAccount>
        </aside>
    );
}
export default Sidebar;
