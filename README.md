# MYROSKIT

A client-side web interface for [PluralKit](https://pluralkit.me/). View and manage your system, members, groups, switches, and more directly from your browser.

## Getting Started

1. Open the website. https://myrieons.github.io/MyrosKit/
2. Get your PluralKit token by DMing the PluralKit bot on Discord with `pk;token`.
3. Paste your token into the login screen and click **Sign in**.

Your token is stored in on your device only. It is not sent to the creators of MyrosKit under any circumstances.

---

## Pages

### Members 
Your full member list with search, pagination, and pinning.

- **Search** by name, display name, pronouns, or ID
- **Pin** members to the top of the list
- **Set front** directly from any member card
- **Expand** a member card to view and edit all fields: name, display name, pronouns, birthday, color, avatar, banner, and description
- **Folders** — create local folders to organise members into groups. Folders appear as cards at the top of the list; click one to drill in. Folders are stored in your browser and are seperate from groups. 

### System 
View and edit your system's info: name, tag, pronouns, color, avatar, banner, and description.

### Switch History
A paginated timeline of your switch history, grouped by date with durations.

- **Log a switch** — pick members from a searchable checklist and submit directly to PluralKit
- **Pagination** — 7 entries per page. Older history is fetched from the API automatically as you page through

### Group List 
View and manage your PluralKit groups. (NOTE: CURRENTLY NOT ENTIRELY FUNCTIONAL, MAY EXPERIENCE BUGS.)

- Expand any group to see its fields, description, and member list
- Edit name, display name, color, icon, banner, and description inline
- **Member checklist** — add or remove members from a group directly
- **Create new groups** from the panel above the list
- Delete groups with confirmation

### Analytics 
Stats from your switch history.

- **Switch counts** — today, this week, this month, and all time
- **Top fronters** — top 3 by total front time, switchable between last 7 days / last 30 days / all time, with proportional bar charts
- **Most co-fronts** — top 5 pairs of members who appear in the same switch together

Fetches your complete switch history on load (May be slower for larger switch history).

### Settings

- **ImgBB API key** — add a free [ImgBB](https://imgbb.com) key to enable direct image uploads from avatar and banner fields. The key is stored in your browser's local storage and only ever sent to ImgBB's API. A **Test** button verifies the key works before you save it.
- **Session** — view your masked PluralKit token and sign out.


## Privacy

- Your PluralKit token is kept in **session storage** only and cleared on tab close
- Your ImgBB API key is kept in **local storage** (persists across sessions, browser-only)
- Folder assignments are kept in **local storage** (browser-only, never sent anywhere)
- No analytics, no telemetry, no external requests except to `api.pluralkit.me` and `api.imgbb.com` (if configured)
