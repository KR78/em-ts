
Install node modules with npm

```bash
npm install
```
Create a config folder in root directory, add add a default.json file inside the config folder with your env. variables
```json
{
	"host": "db4free.net",
	"username": "emmtest",
	"password": "",
	"database": "emmtest",
	"client_id": "vicfintech-ovse", 
	"client_secret": "", 
	"redirect_url": "http://localhost:3000/callback"

}
```

## Assumptions made

* The account to pull the transactions from to save in the database
* The fields to store for the transactions
* The fields to store for the accounts
* The logs to store, couldn't find metadata for response times from True Layer
* Assumption made to store transactions for a single user (the same id that would be used for no. 3)


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
