import { IssueStatusBadge } from "@/app/components";
import { getInitials } from "@/getInitials";
import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table, Tooltip } from "@radix-ui/themes";
import Link from "next/link";

export default async function LatestIssues() {
  const issues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Heading size="4" mb="4">
        Latest issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && (
                    <Tooltip content={issue.assignedToUser.email!}>
                      <Avatar
                        src={issue.assignedToUser.image!}
                        fallback={getInitials(issue.assignedToUser.name!)}
                        radius="full"
                        variant="solid"
                      />
                    </Tooltip>
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
}
