import styles from './Video.module.scss';
import classNames from 'classnames/bind';
import VideoContents from './VideoContents';
import VideoInfo from './VideoInfo';
const cx = classNames.bind(styles);



function Video() {
    return (
        <div className={cx("video")}>
            <VideoInfo/>
        </div>
        
    );
}
export default Video;
