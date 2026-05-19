import React from "react";
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi";

type ContactCardProps = {
  name: string;
  email: string;
  role: string;
  image?: React.ReactNode;
};

const ContactCard: React.FC<ContactCardProps> = ({
  name,
  email,
  role,
  image,
}) => {
  return (
    <div className="group w-full glass p-6 rounded-3xl border border-foreground/5 hover:border-primary/20 transition-all duration-300 hover:shadow-xl flex items-center gap-6">
      <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-3xl group-hover:scale-110 transition-transform duration-300">
        {image || <HiOutlineUser />}
      </div>
      <div className="flex-grow">
        <h2 className="text-xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">{name}</h2>
        <p className="text-xs font-semibold uppercase tracking-wider text-foreground/40 mb-2">{role}</p>
        <a 
          href={`mailto:${email}`} 
          className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors"
        >
          <HiOutlineMail className="opacity-60" />
          {email}
        </a>
      </div>
    </div>
  );
};

export default ContactCard;
