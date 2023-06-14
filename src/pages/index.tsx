import { SignIn, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";

import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { CornerUpRight, Heart, Instagram, type Icon, PlusSquare } from "react-feather";

import { api } from "~/utils/api";
import { useRef, useState } from "react";
import { set } from "zod";
import Link from "next/link";
import Layout from "~/components/Layout";
import Card from "~/components/Card";

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
          <div key={data[currentIndex]?.id}>
            <Card
              imageUrl={data[currentIndex]?.imageUrl as string}
              content={data[currentIndex]?.content as string}
              callback={nextCard}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
