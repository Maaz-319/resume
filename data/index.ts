import { desc } from "motion/react-client";

export const navItems = [
    { name: "About", link: "#about" },
    { name: "Projects", link: "#projects" },
    { name: "Contact", link: "#contact" },
    // { name: "Other Work", link: "#otherproj" },
];

export const gridItems = [
    {
        id: 1,
        title: "Maaz Bin Asif",
        description: "I love to Work in AI and Deep Learning like RAG Apps. I like to Work in Web Developement and Android Apps Developement.",
        className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
        imgClassName: "w-full h-full",
        titleClassName: "justify-end",
        img: "pfp.jpg",
        spareImg: "",
    },
    {
        id: 2,
        title: "Dedicated to on time project completion",
        description: "",
        className: "lg:col-span-2 md:col-span-3 md:row-span-2",
        imgClassName: "",
        titleClassName: "justify-start",
        img: "",
        spareImg: "",
    },
    {
        id: 3,
        title: "My tech stack",
        description: "I constantly try to improve",
        className: "lg:col-span-2 md:col-span-3 md:row-span-2",
        imgClassName: "",
        titleClassName: "justify-center",
        img: "",
        spareImg: "",
    },
    // {
    //     id: 4,
    //     title: "CS Student with a passion for Learning.",
    //     description: "",
    //     className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    //     imgClassName: "",
    //     titleClassName: "justify-start",
    //     img: "/grid.svg",
    //     spareImg: "/b4.svg",
    // },

    {
        id: 5,
        title: "Currently working on RAG Applications",
        description: "STATUS",
        className: "md:col-span-3 md:row-span-2",
        imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
        titleClassName: "justify-center md:justify-start lg:justify-center",
        img: "/b5.svg",
        spareImg: "/grid.svg",
    },
    {
        id: 6,
        title: "Do you want to start a project together?",
        description: "",
        className: "lg:col-span-2 md:col-span-3 md:row-span-1",
        imgClassName: "",
        titleClassName: "justify-center md:max-w-full max-w-60 text-center",
        img: "",
        spareImg: "",
    },
];

export const projects = [
    {
        id: 1,
        title: "Note-It",
        des: "Note taking app for Android with Modern Aesthetic Interface.",
        img: "/noteit.png",
        iconLists: ["/kotlin.svg", "/android2.png", "/db.png"],
        link: "https://github.com/Maaz-319/Note-it",
    },
    {
        id: 2,
        title: "Movie-Info",
        des: "Get Information about Latest Movies using IDMB's API",
        img: "/movie.png",
        iconLists: ["/js.png", "/tail.svg", "/jq.png"],
        link: "https://portfolio.maaz.me/web/assets/movie-info/",
    },
    {
        id: 3,
        title: "Space Invasion - PyGame",
        des: "A Python Based 2D Game, Shoot Down the enemy's UFOs",
        img: "/space.png",
        iconLists: ["/pygame.png", "/python.png", "/exp3.svg"],
        link: "https://github.com/Maaz-319/Python/tree/main/PyGame/Space%20Invasion/PY",
    },
    {
        id: 4,
        title: "Num Rec - AI Powered Android App",
        des: "Recognize numbers that user Draws, Using a custom Tensorflow Model.",
        img: "/numrec.png",
        iconLists: ["/kotlin.svg", "/android2.png", "/dp.png", "/ai.png"],
        link: "https://github.com/Maaz-319/NumRec",
    },
];

export const other_proj_list = [
    {
        quote:
            "A Retrieval-Augmented Generation (RAG) application that uses a local vector store to answer questions about the Milky Way Galaxy. Combines document retrieval with Google's Gemini language model to provide accurate, context-aware responses.",
        name: "Retrieval Augmented Generation",
        title: "Python/Langchain/Gemini/ChromaDB",
    },
    {
        quote:
            "A comprehensive C++ console application for managing student, teacher, and staff records in educational institutions. Built with object-oriented programming principles, featuring polymorphism, inheritance, and file-based data persistence.",
        name: "Student Management System",
        title: "C++/OOP Principles",
    },
    {
        quote:
            "Android Based Modern Design Audio Player with Features to Seek Music, Pause and more. Modern, Aesthetic Designed.",
        name: "Audio Player",
        title: "Android/Kotlin/Native",
    },
];

export const companies = [
    {
        id: 1,
        name: "Lanchain",
        // img: "/cloud.svg",
        // nameImg: "/cloudName.svg",
    },
    {
        id: 2,
        name: "Python",
        // img: "/app.svg",
        // nameImg: "/appName.svg",
    },
    {
        id: 3,
        name: "Kotlin",
        // img: "/host.svg",
        // nameImg: "/hostName.svg",
    },
    {
        id: 4,
        name: "C++",
        // img: "/s.svg",
        // nameImg: "/streamName.svg",
    },
    {
        id: 5,
        name: "RAG",
        // img: "/dock.svg",
        // nameImg: "/dockerName.svg",
    },
];

export const workExperience = [
    {
        id: 1,
        title: "Android Developement",
        desc: "Developed Variety of Android Apps in Kotlin as well as React Native (Self Projects)",
        className: "md:col-span-2",
        thumbnail: "/exp1.svg",
    },
    {
        id: 2,
        title: "Python Developer",
        desc: "Developed both CLI as well as GUI Apps in Python (Self Projects)",
        className: "md:col-span-2", // change to md:col-span-2
        thumbnail: "/exp2.svg",
    },
    {
        id: 3,
        title: "Freelance Python Project",
        desc: "Made a GUI based Statistics Calculator based on PANDAS for a Client",
        className: "md:col-span-2", // change to md:col-span-2
        thumbnail: "/exp3.svg",
    },
    {
        id: 4,
        title: "ML/DL",
        desc: "Worked on variety of Machine Learning and Deep Learning Models including RAG (Self Projects)",
        className: "md:col-span-2",
        thumbnail: "/exp4.svg",
    },
];

export const socialMedia = [
    {
        id: 1,
        img: "/git.svg",
        link: 'https://www.github.com/maaz-319/',
        title: "GitHub",
        description: "See Projects on GitHub",
    },
    {
        id: 2,
        img: "/insta.svg",
        link: 'https://www.instagram.com/maaz.binasif/',
        title: "Instagram",
        description: "Follow me on Instagram",
        
    },
    {
        id: 3,
        img: "/link.svg",
        link: 'https://www.linkedin.com/in/maazbinasif/',
        title: "LinkedIn",
        description: "Connect with me on LinkedIn",
    },
];

export const freelancingPlatforms = [
    {
        id: 1,
        img: "/fiverr.svg",
        link: 'https://www.fiverr.com/programmersite',
        title: "Fiverr",
        description: "Hire me on Fiverr",
    },
    {
        id: 2,
        img: "/upwork.svg",
        link: 'https://www.upwork.com/freelancers/~0125097fa43a4543ff?mp_source=share',
        title: "Upwork",
        description: "See my Upwork",
    },
];

export const leftList = ['Python', 'ML/DL', 'TypeScript']
export const rightList = ['Kotlin', 'RAG', 'Langchain']
export const top_sm_text = "Software Developer - AI/ML - Web Developer - RAG/Langchain"
export const main_heading = "Welcome to my Porfolio Website"
export const gen_words = "Transforming Your Ideas into Reality through <Code/>"
export const author_name = "Maaz Bin Asif"
export const animated_phrases = ["Welcome to My Portfolio 😊", "See my Github 👇", "Scroll Down to Explore ⬇️"];
export type Theme =
| "instagram"
| "facebook"
| "github"
| "linkedin"
| "fiverr"
| "upwork";