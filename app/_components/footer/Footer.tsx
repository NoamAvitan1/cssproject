import { IoLogoLinkedin } from "react-icons/io5";

type Props = {

};

export default function Footer (props: Props) {

  return (
    <footer className="w-full h-[300px] bg-secondary items-center flex flex-col gap-10">
        <h1 className="text-6xl font-serif mt-5">Made by:</h1>
        <div className="flex flex-col justify-center items-center">
        <a className="flex items-center gap-1" href="https://www.linkedin.com/in/noam-avitan-33a390271/">
          <span className="text-3xl">Noam Avitan</span>
          <IoLogoLinkedin className="text-blue-500 text-2xl mt-2"/>
        </a>
        <a className="flex items-center gap-1" href="https://www.linkedin.com/in/maoz-schory/">
          <span className="text-3xl">Maoz Schori</span>
          <IoLogoLinkedin className="text-blue-500 text-2xl mt-2"/>
        </a>
        </div>
    </footer>
  );
};
