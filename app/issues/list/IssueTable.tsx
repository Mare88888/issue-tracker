import { IssueStatusBadge } from '@/app/components';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react'
import NextLink from 'next/link';
import { Issue, Status } from '@prisma/client';

export interface IssueQuery {
    status?: Status;
    orderBy?: keyof Issue;
    order?: string;
    page: string;
}

interface Props {
    searchParams: Promise<IssueQuery>; issues: Issue[];
}

const IssueTable = async ({ searchParams, issues }: Props) => {

    const params = await searchParams;
    const statuses = Object.values(Status);
    const status = params.status && statuses.includes(params.status) ? params.status : undefined;
    const orderBy = (params.orderBy === "title" || params.orderBy === "status" || params.orderBy === "createdAt")
        ? params.orderBy
        : "createdAt";
    const order = params.order === "desc" ? "desc" : "asc";


    return (
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
                            <Table.ColumnHeaderCell key={column.value} className={column.className}>
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
    )
}

const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map(column => column.value);

export default IssueTable

/* const params = await searchParams;
    const statuses = Object.values(Status);
    const status = params.status && statuses.includes(params.status) ? params.status : undefined;
    const orderBy = (params.orderBy === "title" || params.orderBy === "status" || params.orderBy === "createdAt")
        ? params.orderBy
        : "createdAt";
    const order = params.order === "desc" ? "desc" : "asc";
    const where = { status };
    const page = parseInt((await searchParams).page) || 1;
    const pageSize = 10;
    */