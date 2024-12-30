import styles from './SuggestAccount.module.scss';
import classNames from 'classnames/bind';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);
function SuggestAccount({ to, children,label }) {
    return (
        <div className={cx('wrapper',{label})}>
            {children}
            <AccountItem></AccountItem>
            <p className={cx('see-more')}>See all</p>
        </div>
    );
}
export default SuggestAccount;
