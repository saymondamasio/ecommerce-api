import { hash } from 'bcrypt';
import { createConnection } from 'typeorm';
import { v4 as uuid } from 'uuid';

async function create(): Promise<void> {
  const connection = await createConnection();

  const id = uuid();
  const password = await hash('admin', 8);

  await connection.query(
    'INSERT INTO users(id, name, email, password, permissions, roles, created_at, updated_at) values($1, $2, $3, $4, $5, $6, now(), now())',
    [
      id,
      'admin',
      'admin@mail.com.br',
      password,
      '{products.list, store.list}',
      '{admin}',
    ],
  );

  await connection.close();
}

create().then(() => console.log('Admin created successfully'));
