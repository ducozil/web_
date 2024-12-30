import Video from '~/components/Video/Video';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { useEffect } from 'react';

const cx =classNames.bind(styles);
function Home() {
    useEffect(()=>{
        document.getElementById("focus").focus()
    },[]);
    return (
        <div id="focus" tabIndex='1' className={cx('wrapper')}>
            <Video />
        </div>
    );
}
export default Home;
