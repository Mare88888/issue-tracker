import prisma from '@/prisma/client';
import { Heading } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react'

interface Props {
    params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt((await params).id) }
    });

    if (!issue) {
        notFound();
    }


    return (
        <div>
            <Heading>{issue.title}</Heading>
            <p>{issue.description}</p>
            <p>{issue.status}</p>
            <p>{issue.createdAt.toDateString()}</p>
        </div>
    )
}

export default IssueDetailPage