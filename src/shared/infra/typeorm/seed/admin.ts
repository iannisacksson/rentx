import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');

  const id = uuidV4();
  const password = await hash('123456', 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, is_admin, driver_license)
    values('${id}', 'Admin', 'admin@rentx.com.br', '${password}', true, 'XXXXXX')
    `,
  );

  await connection.close();
}

create().then(() => console.log('User admin created'));
