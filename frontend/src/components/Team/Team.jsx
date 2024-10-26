import React from "react";
import TeamMember from "./TeamMember";

const Team = () => {
  const teamMembers = [
    {
      name: "John Martin",
      image: "../../../public/peopleImage1.jpeg",
      
      
      
      linkedin: "#",
      instagram: "#",
      facebook: "#",
    },
    {
      name: "Jane Smith",
      image: "../../../public/peopleImage2.jpeg",
      linkedin: "#",
      instagram: "#",
      facebook: "#",
    },
    {
      name: "Emily Johnson",
      image: "../../../public/peopleImage3.jpg",
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
