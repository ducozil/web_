import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import HeaderOnly from '~/components/Layout/HeaderOnly';
import HeaderOnlyAdmin from '~/admin/Layout/HeaderOnly';
import DefaultLayoutAdmin from '~/admin/Layout/DefaultLayout';
import Live from '~/pages/Live';
import Login from '~/pages/Login';
import LoginAdmin from '~/pages/Login/loginAdmin'

import Signin from '~/pages/Signin';
import Record from '~/pages/Record';
import ProfileAll from '~/pages/ProfileAll';
import Videobyid from '~/pages/Comment/Videobyid';
import Dashboard from '~/admin/components/dashboard.js';
import ManageVideo from '~/admin/components/Video';
import AllVideo from '~/admin/components/AllVideo';
import ManageUser from '~/admin/components/user';
import VideobyidAdmin from '~/admin/components/Video/Videobyid';
import ManageRestoreUser from '~/admin/components/user/restore';
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/following", component: Following },
  { path: "/profile", component: Profile },
  { path: "/upload", component: Upload, layout: HeaderOnly },
  { path: "/live", component: Live },
  { path: "/login", component: Login },
  { path: "/signin", component: Signin },
  { path: "/record", component: Record, layout: HeaderOnly },

  {
    path: "/profileall/:userId",
    component: ProfileAll,
  },
  { path: "/admin/login", component: LoginAdmin, layout: HeaderOnly },
  {
    path: "/comment/:videoId",
    component: Videobyid
  },


];
const privateRoutes = [
  { path: "/admin/dashboard", component: Dashboard, layout: DefaultLayoutAdmin },
  { path: "/admin/video/:userId", component: ManageVideo, layout: DefaultLayoutAdmin },
  { path: "/admin/allVideo", component: AllVideo, layout: DefaultLayoutAdmin },
  { path: "/admin/user", component: ManageUser, layout: DefaultLayoutAdmin },
  { path: "/admin/user/restore", component: ManageRestoreUser, layout: DefaultLayoutAdmin },
  { path: "/admin/comment/:videoId", component: VideobyidAdmin, layout: DefaultLayoutAdmin }
]

export { publicRoutes, privateRoutes }  