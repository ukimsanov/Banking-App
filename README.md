
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

* [Git](https://git-scm.com/)

 * [Node.js](https://nodejs.org/en)
    
* [npm](https://www.npmjs.com/) (Node Package Manager)


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

### Plaid

1. Navigate to [Plaid](https://plaid.com/) and create an account
3. Navigate to the keys section
4. Copy  ```client_id``` and paste it in ```.env``` as  ```PLAID_CLIENT_ID```
5. Below this, in the secrets section, copy ```sandbox``` and paste it in ```.env``` as ```PLAID_SECRET```
6. Navigate to integrations and enable Dwolla integration

### Dwolla

1. Navigate to [Dwolla Sandbox](https://accounts-sandbox.dwolla.com/login) and create an account
3. Navigate to the applications section
4. Copy  ```KEY``` and paste it in ```.env``` as  ```DWOLLA_KEY```
5. Copy ```SECRET``` and paste it in ```.env``` as ```DWOLLA_SECRET```

### Appwrite Setup

1. Navigate to [Appwrite](https://appwrite.io/) and create an account.
2. Create a new Appwrite project.
3. Copy the project ID next to your project's name and paste it in `.env` as `NEXT_PUBLIC_APPWRITE_PROJECT`.
4. Create an API Key with access to all scopes.
5. Copy the API Secret and paste it in `.env` as `NEXT_APPWRITE_KEY`.
6. Navigate to Databases and create a database.
7. Copy the database ID next to your database's name and paste it in `.env` as `APPWRITE_DATABASE_ID`.
8. Create a collection named `users`.
9. Copy the collection ID and paste it in `.env` as `APPWRITE_USER_COLLECTION_ID`.

#### User Collection Attributes

- **type Email**: `email`, required
- **type String**: `userId`, size: 1000, required
- **type String**: `dwollaCustomerUrl`, size: 1000, required
- **type String**: `dwollaCustomerId`, size: 1000, required
- **type String**: `firstName`, size: 100, required
- **type String**: `lastName`, size: 100, required
- **type String**: `address1`, size: 100, required
- **type String**: `city`, size: 100, required
- **type String**: `postalCode`, size: 10, required
- **type String**: `dateOfBrith`, size: 100, required
- **type String**: `ssn`, size: 50, required
- **type String**: `state`, size: 50, required

10. Create a collection named `transactions`.
11. Copy the collection ID and paste it in `.env` as `APPWRITE_TRANSACTION_COLLECTION_ID`.

#### Transactions Collection Attributes

- **type String**: `name`, size: 100, required
- **type String**: `amount`, size: 100, required
- **type String**: `channel`, size: 100, required
- **type String**: `category`, size: 100, required
- **type String**: `senderId`, size: 1000, required
- **type String**: `receiverId`, size: 1000, required
- **type String**: `senderBankId`, size: 1000, required
- **type String**: `receiverBankId`, size: 1000, required
- **type String**: `email`, size: 100, required (yes, String, not Email type)

12. Create a collection named `banks`.
13. Copy the collection ID and paste it in `.env` as `APPWRITE_BANK_COLLECTION_ID`.

#### Banks Collection Attributes

- **type String**: `accountId`, size: 1000, required
- **type String**: `bankId`, size: 1000, required
- **type String**: `accessToken`, size: 1000, required
- **type String**: `fundingSourceUrl`, size: 1000, required
- **type String**: `shareableId`, size: 1000, required
- **type Relationship**: `userId`, relationship: one-way, related collection: `users`, relation: many to one, on deleting: set NULL

### Deployment




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
