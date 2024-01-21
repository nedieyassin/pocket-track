# Pocket Track

## Overview

Pocket Track is a personal financial tracking web app designed to empower individuals to take control of their finances.
It allows users to easily manage expenses, and gain insights into their spending habits through intuitive
visualizations.

## Demo

[Live Demo](https://pocket-track.up.railway.app/)

## Technologies Used

- **Frontend:** [Nuxt 3](https://nuxt.com/), [Tailwind](https://tailwindcss.com/), [Vue](https://vuejs.org/)
- **Backend:** [Typescript](https://www.typescriptlang.org/), [Prisma](https://www.prisma.io/), [Kinde](https://kinde.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Hosting:** [railway.app](https://railway.app/)

## Installation

1. Clone the repository.
   ```bash
   git clone https://github.com/nedieyassin/pocket-track.git 
   ```

2. Install dependencies.
   ```bash
    cd pocket-track
   yarn install
   ```

3. Configure the app Database URL and [Kinde](https://kinde.com/)  environment variable this requires a kinde auth account. use `/env.example` for
   reference.

4. Run `yarn prisma migrate` to migrate the database.
5. Run `yarn prisma generate` to generate the Prisma Client.
6. Run the SQL in `prisma/functions/wallet_balance_trigger.sql` to create the PostgreSQL Functions and Triggers to
   update the wallet balance when transactions are created, updated, or deleted.
6. Run `yarn start` to start the app.
7. Visit `http://localhost:3000` in your browser.
   

