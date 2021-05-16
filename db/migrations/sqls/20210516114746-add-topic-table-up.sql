CREATE TABLE topic(
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    identifier  TEXT NOT NULL,
    is_deleted BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);