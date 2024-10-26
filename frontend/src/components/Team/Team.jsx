import React from "react";
import TeamMember from "./TeamMember";

const Team = () => {
  const teamMembers = [
    {
      name: "Kalpana",
      image: '../../../public/kalpana.jpg',
      
      
      
      linkedin: "#",
      instagram: "#",
      facebook: "#",
    },
    {
      name: "Prabodha",
      image: '../../../public/prabodha.jpg',
      linkedin: "#",
      instagram: "#",
      facebook: "#",
    },
    {
      name: "Sageeth",
      image: "../../../public/sageeth.jpg",
      linkedin: "#",
      instagram: "#",
      facebook: "#",
    },
  ];

  return (
    <div 
     data-testid="team"
    className="mt-12">
      <h1 className="mb-10 text-3xl font-semibold text-center text-black">Meet Our Team</h1>

      <div className="flex justify-center my-5 space-x-10">
        {teamMembers.map((member, index) => (
          <TeamMember
            key={index}
            name={member.name}
            image={member.image}
            linkedin={member.linkedin}
            instagram={member.instagram}
            facebook={member.facebook}
          />
        ))}
      </div>
    </div>
  );
};

export default Team;
