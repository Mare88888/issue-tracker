import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import LatestIssues from "./LatestIssues";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: Status.OPEN } })
  const inProgress = await prisma.issue.count({ where: { status: Status.IN_PROGRESS } })
  const closed = await prisma.issue.count({ where: { status: Status.CLOSED } })
  const statusCounts = { open, inProgress, closed }

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary {...statusCounts} />
        <IssueChart {...statusCounts} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
