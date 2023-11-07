import {Outlet} from 'react-router-dom'

function PageContent() {
  return (
    <div className="PageContent">
      {/* <AppRoutes /> */}
      <Outlet />
    </div>
  );
}
export default PageContent;
