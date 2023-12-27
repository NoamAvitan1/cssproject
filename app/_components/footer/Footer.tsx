import { TiSocialLinkedin } from "react-icons/ti";

type Props = {};

export default function Footer(props: Props) {
  return (
    <footer className="flex h-[150px] w-full flex-col items-center gap-10 bg-secondary">
      <div className="flex items-center justify-center gap-11 font-bold m-auto">
        <a
          className="flex flex-col items-center gap-1"
          href="https://www.linkedin.com/in/noam-avitan-33a390271/"
        >
          <span className="">Noam Avitan</span>
          <div className="rounded-full bg-blue-500">
            <TiSocialLinkedin className="rounded-full text-white text-lg" />
          </div>
        </a>
        <a
          className="flex flex-col items-center gap-1"
          href="https://www.linkedin.com/in/maoz-schory/"
        >
          <span className="">Maoz Schory</span>
          <div className="rounded-full bg-blue-500">
            <TiSocialLinkedin className="rounded-full text-white text-lg" />
          </div>
        </a>
      </div>
    </footer>
  );
}
