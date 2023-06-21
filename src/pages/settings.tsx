import { type NextPage } from 'next';
import LoadingSpinner from '~/components/LoadingSpinner';
import SettingsPanel from '~/components/SettingsPanel';
import { type RouterOutputs, api } from '~/utils/api';

export type OnePostWithUser = RouterOutputs['posts']['getOneByAuthorId'];

const Settings: NextPage = () => {
  const { data } = api.posts.getOneByAuthorId.useQuery();

  if (!data) return <LoadingSpinner size={100} />;

  return <SettingsPanel data={data} />;
};

export default Settings;
