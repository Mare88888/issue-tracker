"use client"
import { Select } from '@radix-ui/themes'

const AssigneeSelect = () => {
    return (
        <Select.Root>
            <Select.Trigger placeholder="Assign..." />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Item value="1">John Doe</Select.Item>
                    <Select.Item value="2">Jane Doe</Select.Item>
                    <Select.Item value="3">John Smith</Select.Item>
                    <Select.Item value="4">Jane Smith</Select.Item>
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default AssigneeSelect