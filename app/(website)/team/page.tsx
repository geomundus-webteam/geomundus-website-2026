import type { Metadata } from "next";
import {
  currentConferenceYearQuery,
  currentTeamMembersQuery,
} from "@/lib/sanity.queries";
import { cachedClient } from "@/lib/sanity.client";
import { TeamMemberCard } from "@/components/team-member-card";
import { TeamMember } from "@/sanity.types";

export const metadata: Metadata = {
  title: "Team",
  description: "Learn more about our conference and the team behind it.",
};

// Group team members by team
function groupMembersByTeam(members: (TeamMember & { photoUrl?: string })[]) {
  if (!members || members.length === 0) {
    return {};
  }

  const grouped = members.reduce(
    (acc, member) => {
      const teamName = member.teamName;
      if (!acc[teamName]) {
        acc[teamName] = [];
      }
      acc[teamName].push(member);
      return acc;
    },
    {} as Record<string, (TeamMember & { photoUrl?: string })[]>,
  );

  return grouped;
}

const teamNameLabels: Record<string, string> = {
  program: "Program Team",
  budget: "Budget Team",
  web: "Web Team",
  local: "Local Team",
  steering: "Steering Team",
  pr: "Public Relations Team",
  other: "Other Team",
};

export default async function AboutPage() {
  const currentYear = await cachedClient(currentConferenceYearQuery.query);
  const teamMembers = await cachedClient(currentTeamMembersQuery.query, {
    year: currentYear,
  });
  const groupedMembers = groupMembersByTeam(teamMembers);
  const teamNames = Object.keys(groupedMembers).sort();
  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-emerald-800 to-teal-600">
      {/* Hero Section */}
      <section className="pt-32 px-4 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Us
            </h1>
            <p className="text-xl text-white leading-relaxed">
              Learn more about our conference and the dedicated team that makes
              it all possible.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Team
              </h2>
              <p className="text-lg text-gray-600">
                Meet the dedicated individuals who work tirelessly to bring you
                an exceptional conference experience.
              </p>
            </div>

            {teamNames.length > 0 ? (
              <div className="space-y-12">
                {teamNames.map((teamName) => (
                  <div key={teamName}>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                      {teamNameLabels[teamName] || teamName}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                      {groupedMembers[teamName].map((member) => (
                        <TeamMemberCard key={member._id} member={member} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Team information will be available soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16"></section>
    </div>
  );
}
