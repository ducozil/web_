import { Children } from 'react';
import styles from './Menu.module.scss'
import classNames from 'classnames/bind'
function Menu({children}){
    const cx=classNames.bind(styles);
    return(
        <nav className={cx('wrapper')}> 
          {children}
        </nav>
        
    )
}
export default Menu