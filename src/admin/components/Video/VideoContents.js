import styles from './Video.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState, useCallback } from 'react';
import classNames from 'classnames/bind';
import { faBookBookmark, faComment, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function VideoContents({ video, idVideo, userId }) {
    const [likedVideos, setLikedVideos] = useState([]);
    const [allVideo, setAllVideo] = useState([]);
    const [videoCount, setVideoCount] = useState();
    // Fetch liked videos
    const fetchLikedVideos = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:5000/like/get-By-idUser/${userId}`);
            if (response.ok) {
                const result = await response.json();
                setLikedVideos(result.data || []);
            } else {
                console.error(`Failed to fetch liked videos. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching liked videos:', error);
        }
    }, [likedVideos || videoCount]);

    // Fetch all videos
    const fetchVideoCount = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:5000/video/videobyId/${idVideo}`);
            if (response.ok) {
                const data = await response.json();
                setVideoCount(data.data[0]?.count || 0); // Cập nhật video count từ API
            } else {
                console.error(`Failed to fetch video count. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching video count:', error);
        }
    }, [idVideo]);

    useEffect(() => {
        fetchLikedVideos();
        fetchVideoCount();
    }, [fetchLikedVideos, fetchVideoCount]);

    const handleLike = async () => {
        const body = { idUser: userId, idVideo };

        // try {
        //     const response = await fetch(`http://localhost:5000/like/add-new`, {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(body),
        //     });

        //     if (response.ok) {
        //         const data = await response.json();
        //         if (data.success) {
        //             // Update liked videos and video list
        //             const isAlreadyLiked = likedVideos.some((item) => item.idVideo === idVideo && item.liked === 1);

        //             setLikedVideos((prev) =>
        //                 isAlreadyLiked
        //                     ? prev.map((item) =>
        //                         item.idVideo === idVideo
        //                             ? { ...item, liked: 0, count: item.count - 1 }
        //                             : item
        //                     )
        //                     : [...prev, { idVideo, liked: 1, count: 1 }]
        //             );

        //             setAllVideo((prev) =>
        //                 prev.map((item) =>
        //                     item.idVideo === idVideo
        //                         ? { ...item, count: item.count + (isAlreadyLiked ? -1 : 1) }
        //                         : item
        //                 )
        //             );
        //         } else {
        //             console.error('Failed to toggle like. API returned an error.');
        //         }
        //     } else {
        //         console.error(`Failed to toggle like. Status: ${response.status}`);
        //     }
        // } catch (error) {
        //     console.error('Error toggling like:', error);
        // }
    };

    const isLiked = likedVideos.some((item) => item.idVideo === idVideo && item.liked === 1);

    return (
        <div className={cx("video-contents")}>
            <video controls className={cx("videos")}>
                <source src={`http://localhost:5000/images/videos/${video}`} type="video/mp4" />
            </video>
            <div className={cx("icon-like")}>
                <FontAwesomeIcon
                    className={cx("icon-new", { liked: isLiked })}
                    icon={faHeart}
                    style={{ color: isLiked ? "red" : "black" }}
                    onClick={handleLike}
                    aria-label="Like video"
                />
                <strong>{videoCount !== undefined ? videoCount : 0}</strong>

                <Link style={{ textDecoration: "none" }} to={`/admin/comment/${idVideo}`}>
                    <FontAwesomeIcon className={cx("icon-new")} icon={faComment} aria-label="Comment on video" />
                </Link>
                <strong>1495</strong>

                <FontAwesomeIcon className={cx("icon-new")} icon={faBookBookmark} aria-label="Bookmark video" />
                <strong>149k</strong>

                <FontAwesomeIcon className={cx("icon-new")} icon={faShare} aria-label="Share video" />
                <strong>2015</strong>
            </div>
        </div>
    );
}

export default VideoContents;
