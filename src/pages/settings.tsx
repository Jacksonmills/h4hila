import { type NextPage } from 'next';
import Head from 'next/head';
import LoadingSpinner from '~/components/LoadingSpinner';
import NewUserPanel from '~/components/NewUserPanel';
import SettingsPanel, {
  getAvailableUsername,
} from '~/components/SettingsPanel';
import { type RouterOutputs, api } from '~/utils/api';

export type OnePostWithUser = RouterOutputs['posts']['getOneByAuthorId'];

const Settings: NextPage = () => {
  const { data, isLoading } = api.posts.getOneByAuthorId.useQuery();

  if (isLoading) return <LoadingSpinner size={69} />;

  if (!data) return <NewUserPanel />;

  const username = getAvailableUsername(data);
  const title = `${username} settings`.toUpperCase();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <h1 className='sr-only'>{title}</h1>
      <SettingsPanel data={data} />
    </>
  );
};

export default Settings;
