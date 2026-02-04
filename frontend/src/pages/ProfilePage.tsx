import { useEffect, useState } from 'react';
import { Button, Group, Paper, Text, Title } from '@mantine/core';
import { api } from '../api';
import { auth } from '../auth';
import { Link, useNavigate } from 'react-router-dom';

export function ProfilePage() {
  const nav = useNavigate();
  const [me, setMe] = useState<{ id: number; email: string; role: 'admin' | 'user' } | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.me();
        setMe(data);
      } catch (e: any) {
        setErr(e.message ?? 'Failed to load profile');
      }
    })();
  }, []);

  return (
    <Paper withBorder p="lg" maw={520} mx="auto" mt="xl">
      <Group justify="space-between" mb="md">
        <Title order={2}>Profile</Title>
        <Button variant="light" onClick={() => { auth.clear(); nav('/login'); }}>Logout</Button>
      </Group>

      {err && <Text c="red">{err}</Text>}
      {!err && !me && <Text>Loading…</Text>}

      {me && (
        <>
          <Text><b>ID:</b> {me.id}</Text>
          <Text><b>Email:</b> {me.email}</Text>
          <Text><b>Role:</b> {me.role}</Text>

          {me.role === 'admin' && (
            <Text mt="md">
              <Link to="/admin">Open admin page</Link>
            </Text>
          )}
        </>
      )}
    </Paper>
  );
}
