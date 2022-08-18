#!/bin/bash

curl 'https://api.zotero.org/users/9700705/publications/items?limit=100&format=csljson&sort=date&order=desc' > ../src/assets/publications.json
