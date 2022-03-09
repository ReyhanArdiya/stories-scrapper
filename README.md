# stories-scrapper

A scrapper REST API that scrapes stories data from sources like Wattpad or Ao3.
This scrapper was built based on how Wattpad and Ao3 website was
designed in early March 2022.

# How to Use

Both of these methods below use the same REST endpoints explained in the [Endpoints](#endpoints) section.

## Localhost

If you want to use this locally, you can clone or fork this repo. Make sure to add a `.env` file in the root of the project that contains these variables:

```env
PORT=<PortNumber>
MONGODB_URL=<MongoConnectionString>
```

example:

```env
PORT=9000
MONGODB_URL=mongodb://localhost:27017/StoriesScrapperDB
```

## Heroku

You can use this API from the hosted version in heroku.

# Endpoints

There are 2 scrappers available: Wattpad and Ao3, which scrapes list of stories.
The data that is sent uses `JSON` format

## Params

Both scrappers have similar params that you can append as a query string on each request:

| Param  |                                       Description                                        |        Example         |
| :----: | :--------------------------------------------------------------------------------------: | :--------------------: |
| `tags` | A comma separated list of strings that will control what tags to search the stories from | `tags=popular,stories` |

## Wattpad

The wattpad scrapper can be accessed through `/wattpad` endpoint. The endpoints
below starts from this endpoint.

### WattpadStory

When requesting for a story from this endpoint, it will send `JSON` object
with this schema:

```json
{
	"author": String,
	"cover": String,
	"link": String,
	"reads": Number,
	"title": String,
	"votes": Number
}
```

### /stories

```http
GET /stories?tags=a,b,c
```

Sends an array of up to 10 [WattpadStory](#wattpadstory) containing stories found from
searching using the `tags` param.

Example request and response:

```http
GET /wattpad/stories?tags=popular
```

```json
[
	{
		"author": "Kate Marchant",
		"cover": "https://img.wattpad.com/cover/890487-144-k595195.jpg",
		"link": "https://www.wattpad.com/story/890487-float",
		"reads": 26,
		"title": "Float",
		"votes": 585000
	},
	{
		"author": "LOSALINI",
		"cover": "https://img.wattpad.com/cover/54319053-144-k191036.jpg",
		"link": "https://www.wattpad.com/story/54319053-best-friend%27s-revenge",
		"reads": 3,
		"title": "Best Friend's Revenge",
		"votes": 124000
	},
	{
		"author": "Mekayla Pridget",
		"cover": "https://img.wattpad.com/cover/189015872-144-k888782.jpg",
		"link": "https://www.wattpad.com/story/189015872-i-accidentally-kissed-my-bestfriends-brother",
		"reads": 4,
		"title": "I Accidentally Kissed My Bestfrien...",
		"votes": 113000
	}
	// ...Up to 10 stories
]
```

## Ao3

The ao3 scrapper can be accessed through `/ao3` endpoint. The endpoints
below starts from this endpoint.

### Ao3Story

When requesting for a story from this endpoint, it will send `JSON` object
with this schema:

```json
{
	"author": String,
	"bookmarks": Number,
	"hits": Number,
	"kudos": Number,
	"link": String,
	"title": String
}
```

### /tags

```http
GET /tags?tags=a,b,c
```

Sends an array of up to 10 [Ao3Story](#ao3story) containing stories found from
searching using the `tags` param.

Example request and response:

```http
GET /ao3/tags?tags=top,stories
```

```json
[
	{
		"author": "ShootingStar7123",
		"bookmarks": 49,
		"hits": 6783,
		"kudos": 204,
		"link": "https://archiveofourown.org/works/16349465",
		"title": "Running Silent"
	},
	{
		"author": "PsycheStellata707",
		"bookmarks": 1922,
		"hits": 219242,
		"kudos": 7597,
		"link": "https://archiveofourown.org/works/23679376",
		"title": "The Darkness Before Dawn"
	},
	{
		"author": "JHSC",
		"bookmarks": 324,
		"hits": 9015,
		"kudos": 850,
		"link": "https://archiveofourown.org/works/17251004",
		"title": "For you have returned my soul within me"
	}
	// ...Up to 10 stories
]
```
