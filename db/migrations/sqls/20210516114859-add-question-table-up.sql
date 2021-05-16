CREATE TABLE question(
   id UUID PRIMARY KEY,
   topic_id UUID NOT NULL,
   stage  TEXT NOT NULL,
   difficulty  TEXT NOT NULL,
   marks  INT NOT NULL, 
   answer_size  INT NOT NULL,
   question  TEXT NOT NULL,
   is_deleted BOOLEAN NOT NULL,
   created_at TIMESTAMP NOT NULL,
   updated_at TIMESTAMP NOT NULL,
   CONSTRAINT fk_topic
       FOREIGN KEY(topic_id)
       REFERENCES topic(id)
);