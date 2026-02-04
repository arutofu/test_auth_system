import { useState } from 'react';
import { Button, Paper, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { api } from '../api';
import { auth } from '../auth';
import { Link, useNavigate } from 'react-router-dom';

export function RegisterPage() {
  const nav = useNavigate();
  const [err, setErr] = useState<string | null>(null);

  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (v) => (/^\S+@\S+$/.test(v) ? null : 'Invalid email'),
      password: (v) => (v.length >= 6 ? null : 'Min 6 chars'),
    },
  });

  return (
    <Paper withBorder p="lg" maw={420} mx="auto" mt="xl">
      <Title order={2} mb="md">Register</Title>

      <form
        onSubmit={form.onSubmit(async (values) => {
          setErr(null);
          try {
            const r = await api.register(values.email, values.password);
            auth.setToken(r.access_token);
            nav('/profile');
          } catch (e: any) {
            setErr(e.message ?? 'Register failed');
          }
        })}
      >
        <TextInput label="Email" placeholder="you@company.com" {...form.getInputProps('email')} />
        <PasswordInput mt="md" label="Password" {...form.getInputProps('password')} />

        {err && <Text c="red" mt="md">{err}</Text>}

        <Button fullWidth mt="lg" type="submit">Create account</Button>
      </form>

      <Text mt="md" size="sm">
        Already have account? <Link to="/login">Login</Link>
      </Text>
    </Paper>
  );
}
