import { useQuery } from "@apollo/client";
import { LaunchProjectContext, LaunchProjectModal } from "@context/eden";
import { MATCH_MEMBERS_TO_SKILLS } from "@graphql/eden";
import { Members } from "@graphql/eden/generated";
import { useContext } from "react";

import { AddSkillsToRoleCard, MemberMatchCard } from "../../components";
import { Loading } from "../../elements";

export interface IShortlistContainerProps {}

export const ShortlistContainer = ({}: IShortlistContainerProps) => {
  const { project, selectedRole, openModal, setOpenModal } =
    useContext(LaunchProjectContext);

  const { data: matchingMembers } = useQuery(MATCH_MEMBERS_TO_SKILLS, {
    variables: {
      fields: {
        skillsID: selectedRole?.skills?.flatMap(
          (skill) => skill?.skillData?._id
        ),
      },
    },
    skip: !selectedRole,
  });

  const filteredMembers =
    matchingMembers?.matchSkillsToMembers?.filter(
      (member: Members) =>
        !project?.team?.some(
          (teamMember) => teamMember?.memberInfo?._id === member?._id
        )
    ) || [];

  return (
    <>
      {openModal}
      {selectedRole && (
        <AddSkillsToRoleCard
          numberOfMembers={filteredMembers.length}
          roleTitle={selectedRole?.title || ""}
          handleOpenSkillsModal={() => setOpenModal(LaunchProjectModal.SKILLS)}
        />
      )}
      {selectedRole &&
        (!filteredMembers.length ? (
          <Loading />
        ) : (
          !!filteredMembers.length && (
            <div className="grid grid-cols-3 gap-x-10 gap-y-10">
              {matchingMembers?.matchSkillsToMembers?.map(
                (_member: any, index: number) => (
                  <MemberMatchCard
                    key={index}
                    onClick={() => {
                      /**/
                    }}
                    member={_member.member}
                    percentage={_member.matchPercentage}
                  />
                )
              )}
            </div>
          )
        ))}
    </>
  );
};
