import { Button } from "../ui/button";

const HomeTopBar = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-3 bg-white gap-3 sm:gap-0">
      <span className="museo-font text-black text-3xl">nanzi</span>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
        <Button variant="ghost">Sign In</Button>
        <Button>Get Started</Button>
      </div>
    </div>
  );
};


export default HomeTopBar;