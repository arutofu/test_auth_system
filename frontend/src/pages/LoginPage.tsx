import { useState } from 'react';
import { Button, Paper, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { api } from '../api';
import { auth } from '../auth';
import { Link, useNavigate } from 'react-router-dom';

export function LoginPage() {
  const nav = useNavigate();
  const [err, setErr] = useState<string | null>(null);

  const form = useForm({
    initialValues: { email: 'admin@example.com', password: 'admin12345' },
    validate: {
      email: (v) => (/^\S+@\S+$/.test(v) ? null : 'Invalid email'),
      password: (v) => (v.length >= 6 ? null : 'Min 6 chars'),
    },
  });

  return (
    <Paper withBorder p="lg" maw={420} mx="auto" mt="xl">
      <Title order={2} mb="md">Login</Title>

      <form
        onSubmit={form.onSubmit(async (values) => {
          setErr(null);
          try {
            const r = await api.login(values.email, values.password);
            auth.setToken(r.access_token);
            nav('/profile');
          } catch (e: any) {
            setErr(e.message ?? 'Login failed');
          }
        })}
      >
        <TextInput label="Email" placeholder="you@company.com" {...form.getInputProps('email')} />
        <PasswordInput mt="md" label="Password" {...form.getInputProps('password')} />

        {err && <Text c="red" mt="md">{err}</Text>}

        <Button fullWidth mt="lg" type="submit">Sign in</Button>
      </form>

      <Text mt="md" size="sm">
        No account? <Link to="/register">Register</Link>
      </Text>
    </Paper>
  );
}
