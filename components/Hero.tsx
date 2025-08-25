import React from 'react'
import { TextGenerateEffect } from './ui/TextGenerateEffect';
import MagicButton from './ui/MagicButton';
import { FaLocationArrow } from 'react-icons/fa';
import { freelancingPlatforms, gen_words, top_sm_text } from '@/data';
import WaveText from './animations/waveBounce';
import ColorCycleText from './animations/changeTextColor';
import ScrambleText from './animations/fadeScaleText';
import Aurora from './ui/HeroBg';
import Image from 'next/image';
import SocialButton from './ui/socialButtons';

function Hero() {
    return (
        <div className="pb-20 pt-36">
            {/* <div className='hidden md:block'>
                <Spotlight
                    className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
                    fill="white"
                />
                <Spotlight
                    className="h-[80vh] w-[50vw] top-10 left-full"
                    fill="purple"
                />
                <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
            </div> */}

            <div className="flex h-screen w-full items-center justify-center bg-black-100 absolute top-0 left-0 hidden md:block">
                {/* <div
                    className={cn(
                        "absolute inset-0",
                        "[background-size:40px_40px]",
                        "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
                        // "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                    )}
                /> */}

                <Aurora
                    colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
                    blend={0.5}
                    amplitude={1.0}
                    speed={0.5}
                />
                {/* <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-black-100"></div> */}
            </div>
            <div className="absolute inset-0 h-screen w-full md:hidden overflow-hidden">
                <Image
                    src="/smalldevicesbg.png"
                    alt="Hero background"
                    fill
                    priority
                    className="absolute inset-0 object-cover blur-sm"
                />

                <div className="absolute inset-0 bg-black/60" />
            </div>


            <div className="flex justify-center relative md:mt-20 z-10">
                <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
                    <h2 className="uppercase tracking-wider text-xs text-center text-blue-100">
                        <ColorCycleText text={top_sm_text} />
                    </h2>

                    <TextGenerateEffect
                        className="text-center text-[40px] md:text-5xl lg:text-6xl my-4"
                        words={gen_words}
                    />

                    <p className="text-center md:tracking-wider text-sm md:text-lg lg:text-2xl text-purple-400">
                        <ScrambleText />
                    </p>

                    <a href="https://www.github.com/maaz-319" target='_blank' className='my-8'>
                        <MagicButton
                            title="Explore My Projects"
                            icon={<FaLocationArrow />}
                            position='right'
                        />
                    </a>

                    <p className="tracking-wider text-sm text-center text-yellow-400">
                        <WaveText text_to_animate="Hi, I'm Maaz/" />
                    </p>
                </div>
            </div>
            <div className="text-white mt-10 z-10 relative w-full">
                <div
                    className="
      grid gap-4 w-full
      grid-cols-1
      sm:grid-cols-2
    "
                >
                    {freelancingPlatforms.map((item) => (
                        <SocialButton
                            key={item.id}
                            theme={item.title}
                            href={item.link}
                            title={item.description}
                            className="w-full justify-center"
                        />
                    ))}
                </div>
            </div>

        </div >
    );
}

export default Hero