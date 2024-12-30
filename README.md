# Web Vault - Public Tweet Archive on BNB Greenfield

Web Vault is a decentralized Tweet archiving platform that allows users to preserve and share tweets by storing them on BNB Greenfield's decentralized storage network.

## Features

- Archive any public tweet with a single click
- Store tweet content and screenshots permanently on BNB Greenfield
- Search archived tweets by Twitter handle
- Favorite tweets for quick access
- Public access to all archived content
- Mobile responsive design

## Architecture

```mermaid
graph TD
    A[User Input Tweet URL] --> B[Scrape Tweet Data]
    B --> C[Generate Screenshot]
    C --> D[Store Metadata in PostgreSQL]
    C --> E[Upload to BNB Greenfield]
    D --> F[Display in UI]
    E --> F
    F --> G[View/Share Archive]
