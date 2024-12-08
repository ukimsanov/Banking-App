
# Banking App

This is a fully functional bank application to manage your transactions and transfers, check your balance and link your bank accounts.

This application is a project built following [this](https://www.youtube.com/watch?v=PuOVqP_cjkE) guide.


## Tech Stack


* Next.js
* TypeScript
* Appwrite
* Plaid
* Dwolla
* React Hook Form
* Zod
* TailwindCSS
* Chart.js
* ShadCN

## Quick Start
#### First, ensure the following are installed in your environment:

* Git

 * Node.js
    
* npm (node package manager)


#### Clone the repository
```bash
  git clone https://github.com/rowflynn/Banking-App.git
  cd Banking-App
```

#### Install all dependencies
```bash
  npm install
```

#### Set up Environment variables

Create a new file named ```.env``` at the root of your application and copy the following code to it:

```dotenv
#NEXT
NEXT_PUBLIC_SITE_URL=localhost:3000

#APPWRITE
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=
APPWRITE_DATABASE_ID=
APPWRITE_USER_COLLECTION_ID=
APPWRITE_BANK_COLLECTION_ID=
APPWRITE_TRANSACTION_COLLECTION_ID=
NEXT_APPWRITE_KEY=

#PLAID
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=sandbox
PLAID_PRODUCTS=auth,transactions,identity
PLAID_COUNTRY_CODES=US,CA

#DWOLLA
DWOLLA_KEY=
DWOLLA_SECRET=
DWOLLA_BASE_URL=https://api-sandbox.dwolla.com
DWOLLA_ENV=sandbox
```
## Configure External Applications

This app requires connections to [Plaid](https://plaid.com/), [Dwolla](https://accounts-sandbox.dwolla.com/login), and [Appwrite](https://appwrite.io/).

#### Plaid

1. Navigate to [Plaid](https://plaid.com/) and create an account
3. Navigate to the keys section
4. Copy  ```client_id``` and paste it in ```.env``` as  ```PLAID_CLIENT_ID```
5. Below this, in the secrets section, copy ```sandbox``` and paste it in ```.env``` as ```PLAID_SECRET```
6. Navigate to integrations and enable Dwolla integration

#### Dwolla

1. Navigate to [Dwolla Sandbox](https://accounts-sandbox.dwolla.com/login) and create an account
3. Navigate to the applications section
4. Copy  ```KEY``` and paste it in ```.env``` as  ```DWOLLA_KEY```
5. Copy ```SECRET``` and paste it in ```.env``` as ```DWOLLA_SECRET```

#### Appwrite

1. Navigate to [Appwrite](https://appwrite.io/) and create an account
3. Create a new appwrite project
4. Copy the project ID next to your project's name and paste it in ```.env``` as  ```NEXT_PUBLIC_APPWRITE_PROJECT```
5. Create API Key with access to all scopes
6. Copy ```API Secret``` and paste it in ```.env``` as  ```NEXT_APPWRITE_KEY```
7. Navigate to databases and create a database
8. Copy the database ID next to your database's name and paste it in ```.env``` as  ```APPWRITE_DATABASE_ID```
9. Create a collection with the name ```users```
10. Copy the collection ID and paste it in ```.env``` as  ```APPWRITE_USER_COLLECTION_ID```
11. Add the following attribites to the collection:
   ```
   --attributes---
   ```
12. Create a collection with the name ```transactions```
13. Copy the collection ID and paste it in ```.env``` as  ```APPWRITE_TRANSACTION_COLLECTION_ID```
14. Add the following attribites to the collection:
   ```
   --attributes---
   ```
15. Create a collection with the name ```users```
16. Copy the collection ID and paste it in ```.env``` as  ```APPWRITE_BANK_COLLECTION_ID```
17. Add the following attribites to the collection:
   ```
   --attributes---
   ```
## Deployment



#### Before deployment, test the build locally with:
```bash
    npm run build
```

#### Host Site with [Vercel](https://vercel.com/)

1. Navigate to [Vercel](https://vercel.com/) and create an account
2. Add a new project
3. Import your git repository
4. Set ```Framework Preset``` to ```Next.js```
4. Copy entire ```.env``` file into environment variables
5. Deploy
