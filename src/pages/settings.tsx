import { type NextPage } from "next";
import Layout from "~/components/Layout";
import LoadingSpinner from "~/components/LoadingSpinner";

const Settings: NextPage = () => {
  return (
    <Layout>
      <LoadingSpinner size={100} />
    </Layout>
  );
};

export default Settings;