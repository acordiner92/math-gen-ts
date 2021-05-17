import pg from 'pg';

const pool = new pg.Pool({
  connectionString:
    'Host=localhost;Database=math_gen;Username=postgres;Password=postgres',
});

// eslint-disable-next-line fp/no-unused-expression
pool.on('error', err => console.error(err));

export default pool;
