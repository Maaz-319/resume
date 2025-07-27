"use client";

import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./GradientBg";
import { GlobeDemo } from "./GridGlobe";
import Lottie from "react-lottie";
import { useState } from "react";
import animationData from '@/data/confetti.json'
import MagicButton from "./MagicButton";
import { IoCopyOutline } from "react-icons/io5";
import { leftList, rightList } from "@/data";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  id,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  id?: number;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('contactme.maaz.binasif@gmail.com');
    setCopied(true);
  }

  return (
    <div
      className={cn(
        id === 1 ? "row-span-1 relative overflow-hidden rounded-3xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none jutify-between flex flex col border border-white/[0.1]" : "row-span-1 relative overflow-hidden rounded-3xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none jutify-between flex flex col space-y-4 border border-white/[0.1]",
        className,
      )}
      style={{
        background: 'rgb(4, 7, 29)',
        backgroundColor: 'linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)',
      }}
    >
      <div className={`${id === 6 && 'flex justify-center'} ${id === 1 && 'flex flex-row'} h-full py-2 lg:py-0`}>
        <div className="w-full h-full absolute">
          {img && (
            // <img
            //   src={img}
            //   alt={img}
            //   className={cn(imgClassName, 'obejct-cover', 'object-center',
            //     id === 1 && 'absolute right-0 top-1/2 transform -translate-y-1/2 z-7 rounded-full w-40 h-40 md:w-40 md:h-40 lg:w-128 lg:h-128',
            //   )}
            // />
            <img
              src={img}
              alt={img}
              className={cn(imgClassName, 'object-cover object-center w-full h-full',
                // Specific positioning for id=1, ensuring it doesn't take up space in the grid column
                id === 1 && 'absolute right-0 top-1/2 transform -translate-y-1/2 z-8 rounded-full !w-40 !h-40 md:!w-40 md:!h-40 lg:!w-128 lg:!h-128',
              )}
            />
          )}
        </div>
        <div className={`absolute right-0 -bottom-5 ${id === 5 && 'w-full opacity-80'}`}>
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              className={'obejct-cover, object-center w-full h-full'}
            />
          )}

        </div>

        {id === 6 && (
          <BackgroundGradientAnimation>
            {/* <div className="absolute z-50 flex items-center justify-center text-white font-bold" /> */}
          </BackgroundGradientAnimation>
        )}

        <div className={cn(
          titleClassName, 'group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 lg:p-10',
        )}>
          {/* <div className={`font-sans text-xs font-extralight text-[#c1c2d3] text-sm md:text-xs lg:text-base z-10 ${id === 1 && 'flex-grow'}`}>
            {description}
          </div> */}
          <div className={`font-sans text-xs font-extralight text-[#c1c2d3] text-sm md:text-xs lg:text-base ${id === 1 ? 'flex-grow w-1/3' : 'mb-2 md:mb-4'}`}>
            <p className="text-base/8 hidden lg:block">
              {description}
            </p>
            {id === 1 && (
              <p className="text-base/2 block lg:hidden mt-4">
                Love to Work in AI and Deep Learning. ALong with Web and Android Dev.
              </p>
            )}
          </div>


          <div className="font-sans font-bold text-lg lg:text-3xl max-w-96 z-10">
            {title}
          </div>

          {id === 2 && <GlobeDemo />}

          {id === 3 && (
            <div className="flex gap-1 lg:gap-4 w-full absolute -right-full">
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-6">
                {leftList.map((item) => (
                  <span key={item} className="py-2 lg:py-4 lg-px-3 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]">
                    {item}
                  </span>
                ))}

                <span className="py-4 px-3 rounded-lg text-center bg-[#10132E]" />
              </div>
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-6">
                <span className="py-4 px-3 rounded-lg text-center bg-[#10132E]" />
                {rightList.map((item) => (
                  <span key={item} className="py-2 lg:py-4 lg-px-3 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {id === 6 && (
            <div className="mt-5 relative">
              <div className={`absolute -bottom-5 right-0 ${copied ? "block" : "block"}`}
              >
                <Lottie options={{
                  loop: copied,
                  autoplay: copied,
                  animationData: animationData,
                  rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice'
                  }
                }} />
              </div>

              <MagicButton
                title={copied ? 'Email Copied' : 'Copy My Email'}
                icon={<IoCopyOutline />}
                position="left"
                otherClasses="`!bg-[#161831]`"
                handleClick={handleCopy}
              />
            </div>
          )}
        </div>
      </div>
    </div>

  );
};
