DROP TABLE IF EXISTS public.adopt_pets;

CREATE TABLE public.adopt_pets (
  id serial PRIMARY KEY,
  pet_name character varying(255) NOT NULL,
  pet_image character varying(255),
  age integer,
  pet_breed character varying(255),
  info text NOT NULL,
  address character varying(255) NOT NULL,
  status character varying(255) NOT NULL,
  foundation_id integer,
  owner_id integer,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER SEQUENCE public.adopt_pets_id_seq OWNED BY public.adopt_pets.id;