import Image from "next/image";
import { motion } from "framer-motion";
import { MotionDiv } from "@/components/MotionDiv";

export interface AnimeProp {
    id: string;
    name: string;
    image: { original: string };
    kind?: string;
    episodes?: number;
    episodes_aired?: number;
    score?: string;
}

interface Prop {
    anime: AnimeProp;
    index: number;
}

const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

function AnimeCard({ anime, index }: Prop) {
    return (
        <MotionDiv
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{
                delay: index * 0.15,
                ease: "easeInOut",
                duration: 0.4,
            }}
            className="max-w-sm rounded-lg overflow-hidden bg-[#1b1e26] shadow-lg hover:shadow-2xl transition-all duration-300 relative group"
        >
            {/* Anime Image */}
            <div className="relative w-full h-[40vh]">
                <Image
                    src={`https://shikimori.one${anime.image.original}`}
                    alt={anime.name}
                    fill
                    className="object-cover rounded-t-lg"
                    priority={index < 3} // Prioritize top items for faster loading
                />
            </div>

            {/* Anime Info */}
            <div className="p-4 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-white text-lg truncate w-3/4">
                        {anime.name}
                    </h2>
                    {anime.kind && (
                        <span className="py-1 px-2 bg-[#161921] text-white text-sm font-semibold rounded capitalize">
                            {anime.kind}
                        </span>
                    )}
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center text-white text-sm font-medium">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/episodes.svg"
                            alt="Episodes"
                            width={20}
                            height={20}
                            className="object-contain"
                        />
                        <p>{anime.episodes || anime.episodes_aired || "?"} Épisodes</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Image
                            src="/star.svg"
                            alt="Rating"
                            width={18}
                            height={18}
                            className="object-contain"
                        />
                        <p className="text-[#FFAD49]">{anime.score || "N/A"}</p>
                    </div>
                </div>
            </div>
        </MotionDiv>
    );
}

export default AnimeCard;