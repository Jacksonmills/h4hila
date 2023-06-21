import { useUser } from '@clerk/nextjs';
import { type NextPage } from 'next';
import LoadingSpinner from '~/components/LoadingSpinner';
import SettingsPanel from '~/components/SettingsPanel';
import { api } from '~/utils/api';

const Settings: NextPage = () => {
  const { user } = useUser();
  const { data } = api.posts.getAll.useQuery();
  if (!data) return null;

  const dataForCurrentUser = data?.filter((post) => {
    return post.post.authorId === user?.id;
  });

  const currentUserCardData = dataForCurrentUser?.[0];

  if (!data) return <LoadingSpinner size={100} />;

  return <SettingsPanel data={currentUserCardData} />;
};

export default Settings;
