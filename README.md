npm i -g vercel
vercel link
vercel env pull
vercel --prod
curl --request POST \
  --url https://api.vercel.com/v9/projects/<project-id-or-name>/custom-environments \
  --header "Authorization: Bearer $VERCEL_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "slug": "<environment_name_slug>",
    "description": "<environment_description>",
  }'# Deploy to a custom environment named "staging":
vercel deploy --target=staging
 
# Pull environment variables from "staging":
vercel pull --environment=staging
 
# Add environment variables to "staging":
vercel env add MY_KEY staging
import { Vercel } from '@vercel/sdk';
 
const vercel = new Vercel({
  bearerToken: '<YOUR_BEARER_TOKEN_HERE>',
});
 
async function run() {
  const result = await vercel.environment.createCustomEnvironment({
    idOrName: '<project-id-or-name>',
    requestBody: {
      slug: '<environment_name_slug>',
      description: '<environment_description>',
    },
  });
  // Handle the result
  console.log(result);
}
 
run();
# Deploy to a custom environment named "staging":
vercel deploy --target=staging
 
# Pull environment variables from "staging":
vercel pull --environment=staging
 
# Add environment variables to "staging":
vercel env add MY_KEY staging
