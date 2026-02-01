import Pagination from '@/app/components/Pagination';
import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import IssueActions from './IssueActions';
import IssueTable, { IssueQuery } from './IssueTable';
import { Flex } from '@radix-ui/themes';

interface Props {
    searchParams: Promise<IssueQuery>;
}

const IssuesPage = async ({ searchParams }: Props) => {
    const params = await searchParams;
    const statuses = Object.values(Status);
    const status = params.status && statuses.includes(params.status) ? params.status : undefined;
    const orderBy = (params.orderBy === "title" || params.orderBy === "status" || params.orderBy === "createdAt")
        ? params.orderBy
        : "createdAt";
    const order = params.order === "desc" ? "desc" : "asc";
    const where = { status };
    const page = parseInt((await searchParams).page) || 1;
    const pageSize = 10;

    const issues = await prisma.issue.findMany({
        where,
        orderBy: { [orderBy]: order },
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    const issueCount = await prisma.issue.count({
        where
    })

    return (
        <Flex direction="column" gap="3">
            <IssueActions />
            <IssueTable searchParams={searchParams} issues={issues} />
            <Pagination pageSize={pageSize} itemCount={issueCount} currentPage={page} />
        </Flex>
    );
};

export const dynamic = "force-dynamic";


export default IssuesPage