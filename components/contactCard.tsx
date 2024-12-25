import React from "react";

type ContactCardProps = {
  name: string;
  email: string;
  role: string;
  image: string;
};

const ContactCard: React.FC<ContactCardProps> = ({
  name,
  email,
  role,
  image,
}) => {
  return (
    <div className="w-5/6 sm:w-2/3 sm:p-6 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 flex ">
      <div className="flex items-center  p-6 text-5xl">{image}</div>
      <div>
        <h2 className="text-md font-semibold text-gray-800  ">{name}</h2>
        <p className="text-gray-600 mb-2">{role}</p>
        <p className="text-blue-500">
          <a href="mailto:john.doe@example.com">{email}</a>
        </p>
      </div>
    </div>
  );
};

export default ContactCard;
