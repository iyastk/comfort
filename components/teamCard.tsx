import React from "react";
import { HiMail } from "react-icons/hi";

type TeamCardProps = {
  name: string;
  email: string;
  role: string;
  image: string;
};

const TeamCard: React.FC<TeamCardProps> = ({ name, email, role, image }) => {
  return (
    <div className="group relative w-full sm:w-[320px] glass p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 mb-4 rounded-full bg-primary/10 flex items-center justify-center text-4xl group-hover:bg-primary/20 transition-colors">
          {image}
        </div>
        <h3 className="text-xl font-serif font-semibold text-foreground mb-1">{name}</h3>
        <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">{role}</p>
        
        <a 
          href={`mailto:${email}`}
          className="flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors text-sm"
        >
          <HiMail size={18} />
          {email}
        </a>
      </div>
    </div>
  );
};

export default TeamCard;
