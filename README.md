# dynsdjs-plugin-api
REST API Plugin

## Installation

Just install the package via npm by doing

```shell
$ npm install -g dynsdjs-plugin-api
```

## Options

You can configure this plugin through Environment variables

- `DYNSD_API_HTTPPORT` for the HTTP service ( default is `80` )

## Usage

The plugin exposes an HTTP port where you can access the following endpoints:

- `/api` it will provide a minimal statistic about which client accessed which domain, as well as a total hit count and how many entires are present in the DNS server

### Example

An example output:

```json
{
  "clients": {
    "127.0.0.1": {
      "google.com": {
        "hit": 1
      }
    }
  },
  "internalEntries": 0,
  "totalHits": 1
}
```

