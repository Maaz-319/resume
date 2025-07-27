import React from 'react'
import { InfiniteMovingCards } from '@/components/ui/InfiniteMovingCards'
import { companies, other_proj_list } from '@/data'

function OtherProj() {
    return (
        <div className="py-20" id='otherproj'>
            <h1 className="heading">
                Other Projects I Have {' '}
                <span className="text-purple-400">Worked on</span>
            </h1>

            <div className="flex flex-col items-center max-lg:mt-10">
                <InfiniteMovingCards
                    items={other_proj_list}
                    direction='right'
                    speed='slow'
                />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg:mt-10">
                {companies.map((company) => (
                    <React.Fragment key={company.id}>
                        <div className="flex md:max-w-60 max-w-32 gap-2">
                            {/* <img
                                src={company.img}
                                alt={company.name}
                                className="md:w-10 w-5"
                            /> */}
                            {/* <img
                                // src={company.nameImg}
                                alt={company.name}
                                width={company.id === 4 || company.id === 5 ? 100 : 150}
                                className="md:w-24 w-20"
                            /> */}
                            <p className="text-center text-sm md:text-base font-semibold text-gray-300">
                            {/* <p className="text-center text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300"> */}
                                {company.name}
                            </p>
                        </div>
                    </React.Fragment>
                ))}
            </div>

        </div>
    )
}

export default OtherProj