# Hero contact config

All hero contact widget content is driven by **`hero-contact.json`**. Edit that file to change the main link and social bar without touching component code.

## Schema

- **email**
  - `localPart` – part before `@` (e.g. `"mail"`).
  - `domainFirst` / `domainRest` – domain split for highlighting (e.g. `"sam"` + `"cux"` → samcux).
  - `tld` – e.g. `"com"`.
  - `mailtoUrl` – full mailto URL used when the email is clicked.

- **socials** – array of items (order = left to right in the pill bar):
  - `id` – unique key (e.g. `"email"`, `"github"`).
  - `icon` – one of: `mail`, `link`, `github`, `linkedin`, `x`, `instagram`, `telegram`, `user`.
  - `url` – link (mailto, https, or path like `/about`).
  - `label` – accessible name (e.g. `"Email"`, `"GitHub"`).
  - `mode` – which part of the main link is highlighted when this item is active: `all`, `domain`, `handle`, `linkedin`, `telegram`, `local`, `twitter`, `instagram`.

To add a new link, add an object to `socials` with the same fields. To remove one, delete its object. To reorder, reorder the array.
