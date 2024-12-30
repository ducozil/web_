import styles from './Button.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
///component nhận các props để xử lý
function Button ({ to, href, primary,outline,small,large,rounded, children,textbutton, onClick }) {
    let Comp = 'button';
    const props={
        onClick,
    };
    if (to){
        props.to=to;
        Comp=Link;
    }
    else if (href){
        props.href=href;
        Comp='a';
    }
    return (
        <Comp className={cx('wrapper', {primary},{outline},{small},{large},{textbutton},{rounded})} {...props}>
            <span>
                {children}
            </span>
        </Comp>
    );
}
export default Button;
