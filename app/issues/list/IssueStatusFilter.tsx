"use client"
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation';


const ALL_STATUS = "__all__";

const statuses: { label: string; value: string }[] = [
    { label: "All", value: ALL_STATUS },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    return (
        <Select.Root
            defaultValue={searchParams.get("status") || ALL_STATUS}
            onValueChange={(status) => {
                const params = new URLSearchParams(searchParams.toString());
                if (status && status !== ALL_STATUS) params.set("status", status);
                else params.delete("status");
                router.push("/issues/list?" + params.toString());
            }}>
            <Select.Trigger placeholder="Filter by status..." />
            <Select.Content>
                {statuses.map((status) => (
                    <Select.Item key={status.value} value={status.value}>
                        {status.label}
                    </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    );
};

export default IssueStatusFilter