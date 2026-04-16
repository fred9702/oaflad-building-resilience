-- Simplified registration form (2026-04-16)
-- Adds `title` column. Existing `category` column is reused to store the new
-- "group" value (Premières Dames, Gouvernement, etc.).
-- Fields no longer collected by the form (phone, organisation, role,
-- gdpr_consent) are kept nullable for backwards compat.

alter table registrations
  add column if not exists title text;

-- Phone / organisation / role remain in the schema but are no longer required
-- by the API (already nullable, nothing to change).

-- gdpr_consent had a NOT NULL default false constraint. Keep it and default
-- true at the API layer since the new lean form removes the explicit checkbox
-- (implicit consent on submission, per the simplified flow).
alter table registrations
  alter column gdpr_consent set default true;
