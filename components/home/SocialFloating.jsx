import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiHashnode } from "react-icons/si";

const SocialFloating = () => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-4 bg-black/40 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/10">
      <a
        href="https://www.linkedin.com/in/gurjap-singh-8714a0301/"
        target="_blank"
        className="text-white text-2xl hover:text-blue-400 transition"
      >
        <FaLinkedin />
      </a>

      <a
        href="https://x.com/Gurjap_Singh_53"
        target="_blank"
        className="text-white text-2xl hover:text-gray-300 transition"
      >
        <FaXTwitter />
      </a>

      <a
        href="https://github.com/hellman53"
        target="_blank"
        className="text-white text-2xl hover:text-gray-400 transition"
      >
        <FaGithub />
      </a>

      <a
        href="https://hashnode.com/@gurjapsingh"
        target="_blank"
        className="text-white text-2xl hover:text-blue-300 transition"
      >
        <SiHashnode />
      </a>
    </div>
  );
};

export default SocialFloating;
