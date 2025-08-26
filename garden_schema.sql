--
-- PostgreSQL database dump
--

-- Dumped from database version 14.18 (Homebrew)
-- Dumped by pg_dump version 16.9 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


--
-- Name: enum_global_contacts_category; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_global_contacts_category AS ENUM (
    'buyer',
    'seller',
    'lender',
    'mortgage_brokerage',
    'selling_agency',
    'listing_agency',
    'recording_office',
    'tax_authority',
    'title_abstractor',
    'surveying_firm',
    'other'
);


--
-- Name: enum_global_contacts_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_global_contacts_status AS ENUM (
    'active',
    'inactive',
    'archived'
);


--
-- Name: enum_global_contacts_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_global_contacts_type AS ENUM (
    'individual',
    'business',
    'government'
);


--
-- Name: enum_orders_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_orders_status AS ENUM (
    'draft',
    'pending',
    'in_review',
    'approved',
    'closing',
    'closed',
    'cancelled'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


--
-- Name: Users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    "firstName" character varying(255),
    "lastName" character varying(255),
    email character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    password character varying(255) DEFAULT 'temp_password'::character varying NOT NULL
);


--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: global_contacts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.global_contacts (
    id uuid NOT NULL,
    type public.enum_global_contacts_type NOT NULL,
    category public.enum_global_contacts_category NOT NULL,
    individual_info jsonb DEFAULT '{}'::jsonb,
    business_info jsonb DEFAULT '{}'::jsonb,
    government_info jsonb DEFAULT '{}'::jsonb,
    contact_info jsonb DEFAULT '{}'::jsonb,
    status public.enum_global_contacts_status DEFAULT 'active'::public.enum_global_contacts_status,
    tags character varying(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    notes text,
    usage_count integer DEFAULT 0,
    last_used timestamp with time zone,
    created_by character varying(255),
    updated_by character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


--
-- Name: COLUMN global_contacts.type; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.global_contacts.type IS 'Determines which data structure to use';


--
-- Name: COLUMN global_contacts.category; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.global_contacts.category IS 'Contact category matching UI tabs';


--
-- Name: COLUMN global_contacts.individual_info; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.global_contacts.individual_info IS 'Personal information for individual contacts';


--
-- Name: COLUMN global_contacts.business_info; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.global_contacts.business_info IS 'Business information for company contacts';


--
-- Name: COLUMN global_contacts.government_info; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.global_contacts.government_info IS 'Government office information';


--
-- Name: COLUMN global_contacts.contact_info; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.global_contacts.contact_info IS 'Contact details for all contact types';


--
-- Name: COLUMN global_contacts.tags; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.global_contacts.tags IS 'User-defined tags for organization';


--
-- Name: COLUMN global_contacts.notes; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.global_contacts.notes IS 'Internal notes about the contact';


--
-- Name: COLUMN global_contacts.usage_count; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.global_contacts.usage_count IS 'How many times this contact has been used in orders';


--
-- Name: COLUMN global_contacts.last_used; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.global_contacts.last_used IS 'When this contact was last used in an order';


--
-- Name: COLUMN global_contacts.created_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.global_contacts.created_by IS 'User who created this contact';


--
-- Name: COLUMN global_contacts.updated_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.global_contacts.updated_by IS 'User who last updated this contact';


--
-- Name: order_contact_links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_contact_links (
    id uuid NOT NULL,
    order_id uuid NOT NULL,
    global_contact_id uuid NOT NULL,
    role character varying(255) NOT NULL,
    order_specific_overrides jsonb DEFAULT '{}'::jsonb,
    linked_by character varying(255),
    linked_at timestamp with time zone,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


--
-- Name: COLUMN order_contact_links.role; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.order_contact_links.role IS 'Role in the order: borrower_0, seller_1, lender, etc.';


--
-- Name: COLUMN order_contact_links.order_specific_overrides; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.order_contact_links.order_specific_overrides IS 'Order-specific data that overrides global contact information';


--
-- Name: COLUMN order_contact_links.linked_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.order_contact_links.linked_by IS 'User who linked this contact to the order';


--
-- Name: COLUMN order_contact_links.linked_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.order_contact_links.linked_at IS 'When this contact was linked to the order';


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id uuid NOT NULL,
    order_number character varying(255) NOT NULL,
    status public.enum_orders_status DEFAULT 'draft'::public.enum_orders_status,
    closing_date timestamp with time zone,
    property_address character varying(255),
    cdf_data jsonb DEFAULT '{}'::jsonb NOT NULL,
    contacts_data jsonb DEFAULT '{}'::jsonb NOT NULL,
    properties_data jsonb DEFAULT '{}'::jsonb NOT NULL,
    payoffs_data jsonb DEFAULT '{}'::jsonb NOT NULL,
    calculations_data jsonb DEFAULT '{}'::jsonb NOT NULL,
    documents_data jsonb DEFAULT '{}'::jsonb NOT NULL,
    audit_log jsonb DEFAULT '[]'::jsonb NOT NULL,
    user_id integer NOT NULL,
    created_by character varying(255),
    updated_by character varying(255),
    notes text,
    is_locked boolean DEFAULT false NOT NULL,
    locked_at timestamp with time zone,
    locked_by character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


--
-- Name: COLUMN orders.cdf_data; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.orders.cdf_data IS 'Stores all CDF namespace data (sections A-N of Closing Disclosure)';


--
-- Name: COLUMN orders.contacts_data; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.orders.contacts_data IS 'Stores borrowers, sellers, agents, lenders, title companies';


--
-- Name: COLUMN orders.properties_data; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.orders.properties_data IS 'Stores property details, legal descriptions, tax info';


--
-- Name: COLUMN orders.payoffs_data; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.orders.payoffs_data IS 'Stores existing loan payoffs';


--
-- Name: COLUMN orders.calculations_data; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.orders.calculations_data IS 'Stores all calculated values and summaries';


--
-- Name: COLUMN orders.documents_data; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.orders.documents_data IS 'Stores generated document references and metadata';


--
-- Name: COLUMN orders.audit_log; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.orders.audit_log IS 'Tracks all changes and user actions';


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: global_contacts global_contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.global_contacts
    ADD CONSTRAINT global_contacts_pkey PRIMARY KEY (id);


--
-- Name: order_contact_links order_contact_links_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_contact_links
    ADD CONSTRAINT order_contact_links_pkey PRIMARY KEY (id);


--
-- Name: orders orders_order_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_order_number_key UNIQUE (order_number);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: global_contacts_business_info; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX global_contacts_business_info ON public.global_contacts USING gin (business_info);


--
-- Name: global_contacts_contact_info; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX global_contacts_contact_info ON public.global_contacts USING gin (contact_info);


--
-- Name: global_contacts_government_info; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX global_contacts_government_info ON public.global_contacts USING gin (government_info);


--
-- Name: global_contacts_individual_info; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX global_contacts_individual_info ON public.global_contacts USING gin (individual_info);


--
-- Name: global_contacts_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX global_contacts_status ON public.global_contacts USING btree (status);


--
-- Name: global_contacts_tags; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX global_contacts_tags ON public.global_contacts USING gin (tags);


--
-- Name: global_contacts_type_category; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX global_contacts_type_category ON public.global_contacts USING btree (type, category);


--
-- Name: global_contacts_usage_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX global_contacts_usage_idx ON public.global_contacts USING btree (usage_count, last_used);


--
-- Name: order_contact_links_global_contact_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX order_contact_links_global_contact_id ON public.order_contact_links USING btree (global_contact_id);


--
-- Name: order_contact_links_order_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX order_contact_links_order_id ON public.order_contact_links USING btree (order_id);


--
-- Name: order_contact_links_order_specific_overrides; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX order_contact_links_order_specific_overrides ON public.order_contact_links USING gin (order_specific_overrides);


--
-- Name: order_contact_links_role; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX order_contact_links_role ON public.order_contact_links USING btree (role);


--
-- Name: orders_cdf_data_gin; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX orders_cdf_data_gin ON public.orders USING gin (cdf_data);


--
-- Name: orders_closing_date_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX orders_closing_date_index ON public.orders USING btree (closing_date);


--
-- Name: orders_contacts_data_gin; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX orders_contacts_data_gin ON public.orders USING gin (contacts_data);


--
-- Name: orders_order_number_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX orders_order_number_unique ON public.orders USING btree (order_number);


--
-- Name: orders_status_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX orders_status_index ON public.orders USING btree (status);


--
-- Name: orders_user_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX orders_user_id_index ON public.orders USING btree (user_id);


--
-- Name: unique_order_role; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX unique_order_role ON public.order_contact_links USING btree (order_id, role);


--
-- Name: order_contact_links order_contact_links_global_contact_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_contact_links
    ADD CONSTRAINT order_contact_links_global_contact_id_fkey FOREIGN KEY (global_contact_id) REFERENCES public.global_contacts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order_contact_links order_contact_links_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_contact_links
    ADD CONSTRAINT order_contact_links_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

