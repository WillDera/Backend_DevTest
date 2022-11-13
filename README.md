# DevTest Task

API DOCUMENTATION: [POSTMAN](https://documenter.getpostman.com/view/21354552/2s8YeuKqXv)

## DataStore Guide

The DataStore is a simple json file which has a `(email, data)` structure.

```
  {
    "user_email": {
      id,
      firstname,
      lastname,
      email,
      password,
      address
    },
    ...
  }
```

### Reasons for this choice:

1. This allows for easy data fetching and searching using the `user's email` (which is readily available) as the key, compared to an `array of objects` which would require iterating through the entire array and checking each object to find a match.

2. When it comes to iterating through each data and making a change eg. not displaying user passwords in the result of the `all-user` route. Getting the keys (emails) in the datastore allows easy targetting of each data entry in the object, and make individual edits. Once again trumping the array counterpart.

3. An array would have worked fine if the data being stored could be effortlessly sorted, say in increasing order or alphabetically but this cant be achieved in an array of objects.
