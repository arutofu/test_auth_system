import { useEffect, useState } from 'react';
import { Paper, Table, Text, Title } from '@mantine/core';
import { api } from '../api';

export function AdminUsersPage() {
  const [rows, setRows] = useState<Array<{ id: number; email: string; role: string; createdAt: string }>>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setRows(await api.adminUsers());
      } catch (e: any) {
        setErr(e.message ?? 'Forbidden');
      }
    })();
  }, []);

  return (
    <Paper withBorder p="lg" maw={900} mx="auto" mt="xl">
      <Title order={2} mb="md">Admin: users</Title>
      {err && <Text c="red">{err}</Text>}

      {!err && (
        <Table withTableBorder striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Role</Table.Th>
              <Table.Th>Created</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.map((u) => (
              <Table.Tr key={u.id}>
                <Table.Td>{u.id}</Table.Td>
                <Table.Td>{u.email}</Table.Td>
                <Table.Td>{u.role}</Table.Td>
                <Table.Td>{new Date(u.createdAt).toLocaleString()}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </Paper>
  );
}
