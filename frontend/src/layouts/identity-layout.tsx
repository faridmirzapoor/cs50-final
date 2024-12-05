import { Outlet } from "react-router-dom";

const IdentityLayout = () => {
  return (
    <>
      <div className="container h-[100vh] grid place-content-center">
        <div className="flex flex-col items-center">
          <h1 className="font-vazirBold">Keep safe your notes</h1>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default IdentityLayout;
