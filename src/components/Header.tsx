import Image from "next/image";
import { Settings } from "react-feather";
import { type PostWithUser } from "~/pages";
import Portal from "./Portal";
import CardEditor from "./CardEditor";
import { useState } from "react";

export default function Header({ isSignedIn, currentUserCardData }: { isSignedIn?: boolean; currentUserCardData?: PostWithUser; }) {
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const toggleModal = () => {
    setShowSettingsModal(!showSettingsModal);
  };

  return (
    <div className="w-screen flex items-center px-4 py-2">
      <h1 className="flex items-center justify-center text-2xl font-bold text-white bg-black px-2 pb-1 md:pb-2 pointer-events-none select-none md:text-4xl">[h4h]</h1>
      <div className="ml-auto flex items-center gap-4 text-white">
        {isSignedIn && (
          <>
            <button
              className='bg-h3Pink rounded-full p-1'
              onClick={toggleModal}
            >
              {currentUserCardData ? (
                <div className='flex w-[30px] h-[30px]'>
                  <Image src={currentUserCardData.author?.profileImageUrl as string} width={30} height={30} alt="profile picture" className="rounded-full object-cover" />
                </div>
              ) : (
                <div className='flex items-center justify-center w-[30px] h-[30px]'>
                  <Settings />
                </div>
              )}
            </button>
            {(showSettingsModal && isSignedIn) && (
              <Portal>
                <div className="absolute top-0 left-0 bg-white text-black p-2 w-full h-screen">
                  <div className="relative  flex flex-col items-center justify-start gap-2">
                    <CardEditor data={currentUserCardData} toggleModal={setShowSettingsModal} />
                  </div>
                </div>
              </Portal>
            )}
          </>
        )}
      </div>
    </div>
  );
}