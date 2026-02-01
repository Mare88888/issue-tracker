import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import { Link, IssueStatusBadge } from "@/app/components"
import IssueActions from './IssueActions';
import { Issue, Status } from '@prisma/client';
import { Oi } from 'next/font/google';
import NextLink from 'next/link';
import { ArrowUpIcon } from '@radix-ui/react-icons';

const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

interface Props {
    searchParams: Promise<{ status?: Status; orderBy?: keyof Issue; order?: string }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
    const params = await searchParams;
    const statuses = Object.values(Status);
    const status = params.status && statuses.includes(params.status) ? params.status : undefined;
    const orderBy = (params.orderBy === "title" || params.orderBy === "status" || params.orderBy === "createdAt")
        ? params.orderBy
        : "createdAt";
    const order = params.order === "desc" ? "desc" : "asc";

    const issues = await prisma.issue.findMany({
        where: status ? { status } : undefined,
        orderBy: { [orderBy]: order },
    });

    return (
        <div>
            <IssueActions />
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        {columns.map(column => {
                            const nextOrder = orderBy === column.value && order === "asc" ? "desc" : "asc";
                            const q = new URLSearchParams();
                            if (status) q.set("status", status);
                            q.set("orderBy", column.value);
                            q.set("order", nextOrder);
                            return (
                                <Table.ColumnHeaderCell key={column.value}>
                                    <NextLink href={`/issues/list?${q.toString()}`}>{column.label}</NextLink>
                                    {column.value === orderBy && <ArrowUpIcon style={{ transform: order === "desc" ? "rotate(180deg)" : undefined }} />}
                                </Table.ColumnHeaderCell>
                            );
                        })}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map(issue => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Link href={`/issues/${issue.id}`}>
                                    {issue.title}
                                </Link>

                                <div className="block md:hidden">
                                    <IssueStatusBadge status={issue.status} />
                                </div>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <IssueStatusBadge status={issue.status} />
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    );
};

export const dynamic = "force-dynamic";


export default IssuesPage