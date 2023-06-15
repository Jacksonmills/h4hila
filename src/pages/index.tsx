import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import { type RouterOutputs, api } from "~/utils/api";
import { type SyntheticEvent, useState, use, useEffect } from "react";
import Layout from "~/components/Layout";
import Card from "~/components/Card";

export type PostWithUser = RouterOutputs["posts"]["getAll"][number];

const Home: NextPage = () => {
  const [bio, setBio] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useUser();
  const { data } = api.posts.getAll.useQuery();

  useEffect(() => {
    if (!user?.publicMetadata.bio) {
      setShowModal(true);
    }
  }, []);

  if (!user) return null;

  function handleNewUser(e: SyntheticEvent) {
    e.preventDefault();
    setShowModal(false);
  }

  if (!data) return (
    <Layout>
      <div className="flex items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-white">No posts!</h1>
      </div>
    </Layout>
  );

  const nextCard = () => {
    setCurrentIndex((currentIndex + 1) % data.length);
  };

  return (
    <Layout>
      <div className="px-4">
        {data && data.length > 0 && (
          <div key={data[currentIndex]?.post.id}>
            <Card
              data={data[currentIndex] as PostWithUser}
              callback={nextCard}
            />
          </div>
        )}
        {showModal && (
          <div className="fixed inset-0 z-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50" />
            <div className="relative bg-white rounded-lg p-4">
              <h1 className="text-2xl font-bold text-center">Set your bio</h1>
              <form className="mt-4" onSubmit={handleNewUser}>
                <textarea
                  className="w-full h-32 p-2 border rounded-lg"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                <button className="mt-4 w-full bg-secondary text-lg text-white rounded-lg p-2">
                  Save
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
