
# APWine Voting Delegation Dashboard Web Interface

## Adding/Editing/Removing Delegate candidates

- Navigate to the delegates.js file in the root of this directory
- It contains a json object list of the candidates in the following format:

```
{
name:  'Jane Cooper',
address:  '0xE27F2E8321Fb4c32525a4ED86d2902dbA63491E4',
bio:  'Went into crypto in 2016. Community builder @ early stage crypto startups. Building the Keep network and tBTC community. Early adopter of Paladin. Believe in what is best for Paladin in the long term and for contributors/community',
discordId:  'BryanMutai#6546',
twitter:  'APWineFinance',
imageUrl:
'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
},
```

- Add the respective fields (for the twitter field, only add the username without the `@` symbol
- Commit the changes to the main branch and redeploy to see the changes
  
## Environment Variables

  The `.env` file contains environment variables that the program needs to function properly.

- `NEXT_PUBLIC_VEAPW_TOKEN_ADDRESS` - Token address for `veAPW` on mainnet and rinkeby
- `NEXT_PUBLIC_VEAPW_TOKEN_SYMBOL` - Token symbol for veAPW
- `NEXT_PUBLIC_APWINE_SPACE` - The apwine space id on snapshot
- `NEXT_PUBLIC_APWINE_DELEGATE_REGISTRY_ADDRESS` The delegate registry address on mainnet and rinkeby to set/remove/fetch the delegate of the connected wallet address
  
## Getting Started with development

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
