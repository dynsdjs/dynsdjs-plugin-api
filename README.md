# dynsdjs-plugin-api
REST API Plugin

## Installation

Just install the package via npm on the dynsdjs project directory

```shell
$ npm install dynsdjs-plugin-api
```

## Usage

The plugin exposes an HTTP `8080` port where you can access the following endpoints:

- `/api` it will provide a minimal statistic about which client accessed which domain, as well as a total hit count and how many entires are present in the DNS server

### Example

Just visit http://localhost:8080/api

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

