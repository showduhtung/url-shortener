# URL Shortener Project

Welcome to my URL shortener project.

## Project description

<details>
 <summary>Click to expand!</summary>

### Tech Stack

FE: React/Mantine

BE: NodeJS/Express/MongoDB

### Scope

The intention of this project is to mimic a production URL shortener application and all of its major features, to a feasible extent. Thus, many considerations were sifted through, being analyzed whether or not they would be appropriately within scope. Limitations include cost, effort and time.

### Functional requirements

1. User should be able to input a valid URL link and receive a shortened link.
2. When accessing the shortened link, the user should be redirected to the original URL.
3. Shortened URLs will expire after 2 years of inactivity.
4. Shortened URLs will have an expiration date of 4 years.

### Non-functional requirements

1. Shortened URLs must be random unique and human readable
2. Availability (returns error if code does not exist)

### Project features

According to scope, the major factor in building project feature considerations was cost. Thus, the majority of the project features consider storage as the limiting factor.

#### 1. URL length limitation

| Browser | Address bar | document.location or anchor tag |
| ------- | ----------- | ------------------------------- |
| Chrome  | 32779       | >64k                            |
| Android | >64k        | >64k                            |
| Firefox | 32779       | >64k                            |
| Safari  | 2047        | 5120                            |
| IE11    | 2047        | 5120                            |
| Edge 16 | 2047        | 10240                           |

https://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers

<strong>tl;dr- 2000 character limit</strong>

#### 2. Storage (character bytes)

Database provided is a MongoDB cloud cluster with a max storage of 512MB.

##### Data Model

| Key            | Max size   | Data type |
| -------------- | ---------- | --------- |
| \_id           | 12 Bytes   | ObjectId  |
| code           | 4 Bytes    | String    |
| link           | 2000 Bytes | String    |
| creationDate   | 70 Bytes   | String    |
| expirationDate | 70 Bytes   | String    |
| inactiveDate   | 70 Bytes   | String    |

max size = 2226bytes

<em>Note- dates should be stored as the DATE data type which would reduce it to 8bytes, but for development ease, it's stored as a string </em>

<strong>tl;dr- 512megabytes / 2226bytes = 241181 max entries</strong>

#### 3. URL (shortened) readability

Considerations for readability is to keep the code as short as possible, while still providing enough available permutations that every entry can be unique (over 241181 max entries).

<details>
<summary>Option 1</summary>

(0-9, a-f) UUID

solve for min x where "16\*x > 241181"; x = 5 characters

</details>

<details>
<summary>Option 2</summary>

(a-z) BASE26

solve for min x where "26\*x > 241181"; x = <strong>4 characters</strong>

</details>

<strong>tl;dr- code max is 4 characters long</strong>

#### 4. URL Expiration

Another consideration based on functional requirements, is that urls can have a lifespan of max 4 years, or 2 years of inactivity. InactiveDate attribute gets updated whenever the link is accessed.

### Items considered out of scope

Based on scope, there were many features that were not included for the sake of either cost or development time. The following items were considered not a priority in prototyping/mimicking a production application.

Provided, there are solutions that could've been made, the project does not consider:

| Description               | Solution                                  |
| ------------------------- | ----------------------------------------- |
| Hacking Attempts          | Sanitize inputs                           |
| Overloaded network        | Load balancers                            |
| Most frequently used urls | Caching system like Redis                 |
| Illegal activity          | Provide a preview option, blacklist sites |

Some other features not included due to time constraints and requirement scope- date timezone unification, analytics, and privatization of urls.

<em>Note- There are certainly more security concerns, but for brevity sake, we'll leave as is here. </em>

</details>

## How to get the project spinning

1. Locate the .env file sent with this project and add to highest level of the directory next to this README.MD. The file should contain a `MONGO_URI` and `BASE_URL` key value pair.
2. Install all the necessary dependencies

```bash
npm i && cd client/ && npm i
```

3. Build

```bash
npm run build
```

4. Run the server

```bash
cd ../ && npm run dev
```

<em>Note- The server operates as 3 servers. It acts as a web server (serves the bundled UI as static forms), runs cronjobs, and api server. This was intentionally done to reduce repository complexity and easily avoid CORS issues. </em>

3. Open in browser

Open browser of choice and enter in `localhost:3000`

## License

[MIT](https://choosealicense.com/licenses/mit/)
