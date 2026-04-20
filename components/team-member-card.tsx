import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter, Globe } from "lucide-react";
import { TeamMember } from "@/sanity.types";

interface TeamMemberCardProps {
  member: TeamMember & { photoUrl?: string };
}

const teamNameLabels: Record<string, string> = {
  program: "Program",
  budget: "Budget",
  web: "Web",
  marketing: "Marketing",
  logistics: "Logistics",
  sponsorship: "Sponsorship",
  registration: "Registration",
  other: "Other",
};

const teamColors: Record<string, string> = {
  program: "bg-blue-100 text-blue-800",
  budget: "bg-green-100 text-green-800",
  web: "bg-purple-100 text-purple-800",
  marketing: "bg-pink-100 text-pink-800",
  logistics: "bg-orange-100 text-orange-800",
  sponsorship: "bg-yellow-100 text-yellow-800",
  registration: "bg-indigo-100 text-indigo-800",
  other: "bg-gray-100 text-gray-800",
};

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  const socialLinks = [
    {
      icon: Twitter,
      url: member.socialLinks?.twitter,
      label: "Twitter",
    },
    {
      icon: Linkedin,
      url: member.socialLinks?.linkedin,
      label: "LinkedIn",
    },
    {
      icon: Github,
      url: member.socialLinks?.github,
      label: "GitHub",
    },
    {
      icon: Globe,
      url: member.socialLinks?.website,
      label: "Website",
    },
  ].filter((link) => link.url);

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Photo */}
          <div className="relative w-36 h-36 rounded-full overflow-hidden bg-gray-100">
            {member.photoUrl ? (
              <Image
                src={member.photoUrl || "/placeholder.svg"}
                alt={member.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 144px, 144px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-3xl font-semibold">
                {member.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Name and Role */}
          <div className="space-y-1">
            <h3 className="font-semibold text-lg text-gray-900">
              {member.name}
            </h3>
            {member.role && (
              <p className="text-sm text-gray-600">{member.role}</p>
            )}
          </div>

          {/* Bio */}
          {member.bio && (
            <p className="text-sm text-gray-600 leading-relaxed">
              {member.bio}
            </p>
          )}

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex space-x-2 pt-2">
              {socialLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  asChild
                  className="h-8 w-8 p-0 hover:bg-gray-100"
                >
                  <Link
                    href={link.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name}'s ${link.label}`}
                  >
                    <link.icon className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
