import { type NextPage } from 'next';
import LoadingSpinner from '~/components/LoadingSpinner';
import NewUserPanel from '~/components/NewUserPanel';
import SettingsPanel from '~/components/SettingsPanel';
import { type RouterOutputs, api } from '~/utils/api';

export type OnePostWithUser = RouterOutputs['posts']['getOneByAuthorId'];

const Settings: NextPage = () => {
  const { data, isLoading } = api.posts.getOneByAuthorId.useQuery();

  if (isLoading) return <LoadingSpinner size={100} />;

  if (!data) return <NewUserPanel />;

  return <SettingsPanel data={data} />;
};

export default Settings;
