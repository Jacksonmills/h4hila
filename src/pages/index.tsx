import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import { type RouterOutputs, api } from "~/utils/api";
import { useState } from "react";
import Layout from "~/components/Layout";
import Card from "~/components/Card";

export type PostWithUser = RouterOutputs["posts"]["getAll"][number];

const Home: NextPage = () => {
  const { user } = useUser();
  const { data } = api.posts.getAll.useQuery();
  const [currentIndex, setCurrentIndex] = useState(0);

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
      <div className="mt-[30px] px-4">
        {data && data.length > 0 && (
          <div key={data[currentIndex]?.post.id}>
            <Card
              data={data[currentIndex] as PostWithUser}
              callback={nextCard}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
