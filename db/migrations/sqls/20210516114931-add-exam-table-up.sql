CREATE TABLE exam(
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    school_name  TEXT NOT NULL,
    instructions TEXT NOT NULL,
    exam_date  TIMESTAMP NOT NULL,
    is_deleted BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE exam_question (
    exam_id UUID REFERENCES exam(id),
    question_id UUID REFERENCES question(id),
    PRIMARY KEY (exam_id, question_id)
);