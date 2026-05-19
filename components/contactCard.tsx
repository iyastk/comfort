import React from "react";
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi";

type ContactCardProps = {
  name: string;
  email: string;
  role: string;
  image?: React.ReactNode;
};

import { useServiceContext } from "@/store/serviceContext";

const ContactCard: React.FC<ContactCardProps> = ({
  name,
  email,
  role,
  image,
}) => {
  const { isDarkMode } = useServiceContext();
  return (
    <div className={`group w-full p-6 rounded-3xl border transition-all duration-300 hover:shadow-xl flex items-center gap-6 ${isDarkMode ? 'bg-white/5 border-white/10 hover:border-primary/20' : 'bg-black/5 border-black/5 hover:border-primary/20'}`}>
      <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-3xl group-hover:scale-110 transition-transform duration-300">
        {image || <HiOutlineUser />}
      </div>
      <div className="flex-grow">
        <h2 className={`text-xl font-serif font-bold transition-colors ${isDarkMode ? 'text-white group-hover:text-primary' : 'text-black group-hover:text-primary'}`}>{name}</h2>
        <p className={`text-xs font-semibold uppercase tracking-wider mb-2 transition-colors ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>{role}</p>
        <a 
          href={`mailto:${email}`} 
          className={`inline-flex items-center gap-2 text-sm transition-colors ${isDarkMode ? 'text-white/60 hover:text-primary' : 'text-black/60 hover:text-primary'}`}
        >
          <HiOutlineMail className="opacity-60" />
          {email}
        </a>
      </div>
    </div>
  );
};

export default ContactCard;
