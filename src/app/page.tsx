import FeatureBar from '@/components/custom/feature-bar';
import Footer from '@/components/custom/footer';
import HomeTopBar from '@/components/custom/home-topbar';
import RegisterCard from '@/components/custom/register-card';

export default function Home() {
  return (
    <div className=" flex flex-col bg-blue-100 ">
      <HomeTopBar />

      <div className="flex flex-col items-center m-20 gap-4">
        <span className=" text-3xl sm:text-6xl font-extrabold text-center">
          From keys to cashflow — we’ve got it covered.
        </span>
        <p className=" sm:w-1/2 text-center text-lg">
          Connect landlords and tenants through our all-in-one real estate
          management platform. Manage properties and track payments with ease.
        </p>

        <div className="w-full flex-col sm:flex sm:flex-row gap-5 justify-center my-5">
          <RegisterCard isTenant={false} />
          <RegisterCard isTenant={true} />
        </div>
      </div>

      <FeatureBar />

      <Footer />
    </div>
  );
}
