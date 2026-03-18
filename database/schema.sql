CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'viewer',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  city VARCHAR(100),
  why_suitable TEXT,
  website VARCHAR(500),
  priority VARCHAR(20) DEFAULT 'medium',
  status VARCHAR(50) DEFAULT 'new',
  touches INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS radar_objects (
  id SERIAL PRIMARY KEY,
  object_name VARCHAR(255) NOT NULL,
  city VARCHAR(100),
  stage VARCHAR(100),
  companies TEXT,
  link VARCHAR(500),
  date DATE,
  status VARCHAR(50) DEFAULT 'new',
  priority VARCHAR(20) DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gip_routes (
  id SERIAL PRIMARY KEY,
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
  lpr_role VARCHAR(100),
  entry_route TEXT,
  redirect_phrase TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
  type VARCHAR(50),
  content TEXT NOT NULL,
  sent_at TIMESTAMP,
  response TEXT,
  status VARCHAR(50) DEFAULT 'draft'
);

CREATE INDEX IF NOT EXISTS idx_companies_priority ON companies(priority);
CREATE INDEX IF NOT EXISTS idx_messages_company ON messages(company_id);

INSERT INTO users (email, password_hash, role)
VALUES
  ('alexey@3dkonstruktiv.ru', '$2a$10$cHiG.V/KrjHUyDVVqnbmW.x.JGX2VyDhV5nZvmA8.8bQQPn1ha8ae', 'admin'),
  ('marina@3dkonstruktiv.ru', '$2a$10$cHiG.V/KrjHUyDVVqnbmW.x.JGX2VyDhV5nZvmA8.8bQQPn1ha8ae', 'viewer')
ON CONFLICT (email) DO NOTHING;

INSERT INTO companies (name, city, why_suitable, website, priority, status)
VALUES
  ('STONE', 'Москва', 'Офисный рынок, STONE Towers', 'https://stone.ru', 'high', 'new'),
  ('Галс-Девелопмент', 'Москва/СПб', 'Группа ВТБ, МФК', 'https://gals.ru', 'high', 'new'),
  ('MR Group', 'Москва', 'Топ-девелопер БЦ', 'https://mr-group.ru', 'high', 'new')
ON CONFLICT DO NOTHING;
