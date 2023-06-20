import { type NextPage } from "next";
import { type RouterOutputs, api } from "~/utils/api";
import { type SyntheticEvent, useState } from "react";
import Layout from "~/components/Layout";
import Card from "~/components/Card";
import LoadingSpinner from "~/components/LoadingSpinner";
import { get } from "http";
import { useUser } from "@clerk/nextjs";

export type PostWithUser = RouterOutputs["posts"]["getAll"][number];

const Home: NextPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // const { user } = useUser();
  const { data } = api.posts.getAll.useQuery();

  if (!data) return (
    <Layout>
      <LoadingSpinner size={100} />
    </Layout>
  );

  // const dataWithoutCurrentUser = data?.filter((post) => {
  //   return post.post.authorId !== user?.id;
  // });

  const dataWithoutCurrentUser = data;

  const nextCard = () => {
    setCurrentIndex((prevIndex) => {
      return getRandomNextIndex(prevIndex);
    });
  };

  const getRandomNextIndex = (currentIndex: number) => {
    if (dataWithoutCurrentUser.length === 1) return currentIndex;

    let nextIndex;
    do {
      nextIndex = getRandomIndex();
    } while (nextIndex === currentIndex);
    return nextIndex;
  };

  const getRandomIndex = () => Math.floor(Math.random() * dataWithoutCurrentUser.length);

  return (
    <Layout>
      <div className="md:flex md:flex-col md:items-center md:justify-center mx-[0.75rem] sm:mx-[1.75rem] pt-2">
        {dataWithoutCurrentUser && dataWithoutCurrentUser.length > 0 && (
          <div key={dataWithoutCurrentUser[currentIndex]?.post.id}>
            <Card
              data={dataWithoutCurrentUser[currentIndex] as PostWithUser}
              callback={nextCard}
            />
          </div>
        )}
      </div>
    </Layout >
  );
};

export default Home;
