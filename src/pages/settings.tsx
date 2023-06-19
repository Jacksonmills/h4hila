import { type NextPage } from "next";
import Layout from "~/components/Layout";
import LoadingSpinner from "~/components/LoadingSpinner";

const Settings: NextPage = () => {
  return (
    <Layout>
      <div className="grid place-content-center w-full h-full">
        <LoadingSpinner size={100} />
      </div>
    </Layout>
  );
};

export default Settings;