import React from "react";
import { HiMail, HiUser } from "react-icons/hi";
import { useServiceContext } from "@/store/serviceContext";

type TeamCardProps = {
  name: string;
  email: string;
  role: string;
  image?: string;
};

const TeamCard: React.FC<TeamCardProps> = ({ name, email, role, image }) => {
  const { isDarkMode } = useServiceContext();

  const getInitials = (n: string) => {
    return n
      .split(" ")
      .map((part) => part[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const isUrl = image && (image.startsWith("/") || image.startsWith("http"));

  return (
    <div className={`group relative w-full sm:w-[320px] p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border ${isDarkMode ? 'bg-white/5 border-white/10 hover:border-primary/40' : 'bg-white border-black/5 hover:border-primary/40 shadow-sm'}`}>
      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center border border-primary/20 group-hover:border-primary/50 transition-all duration-500 group-hover:scale-105 shadow-inner">
          {isUrl ? (
            <img src={image} alt={name} className="w-full h-full rounded-2xl object-cover" />
          ) : (
            <span className="text-xl font-serif font-bold tracking-widest text-primary">
              {getInitials(name)}
            </span>
          )}
        </div>

        <h3 className={`text-xl font-serif font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>{name}</h3>
        <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-6">{role}</p>

        <a
          href={`mailto:${email}`}
          className={`inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-xl border transition-all duration-300 ${
            isDarkMode
              ? 'border-white/10 text-white/60 hover:text-primary hover:border-primary/40 bg-white/5'
              : 'border-black/10 text-black/60 hover:text-primary hover:border-primary/40 bg-black/5'
          }`}
        >
          <HiMail size={16} />
          {email}
        </a>
      </div>
    </div>
  );
};

export default TeamCard;
