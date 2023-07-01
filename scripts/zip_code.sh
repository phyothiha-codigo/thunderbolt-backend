#!/bin/bash

cd ..

zip -r thunderbolt_backend.zip . -x "node_modules/*" -x "dist/*"