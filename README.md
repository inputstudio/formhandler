# Serverless Functions

This repository contains serverless functions used by [Input Studio](https://inputstudio.co?ref=github.com).

At Input Studio, we leverage serverless functions on DigitalOcean for various internal projects. Whether you're new to serverless or already experienced, this repository will provide you with the resources and examples you need to kickstart your own serverless journey.

[![DigitalOcean Referral Badge](https://web-platforms.sfo2.digitaloceanspaces.com/WWW/Badge%203.svg)](https://www.digitalocean.com/?refcode=9c57df1e3053&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge)

## Functions

- [Form handler](packages/formhandler)

## Getting Started

**Prerequisites**: [doctl — DigitalOcean CLI](https://docs.digitalocean.com/reference/doctl/how-to/install/)

Run the following commands to deploy the functions:

```bash
doctl serverless namespaces list-regions # [ams ams3 blr blr1 fra fra1 lon lon1 nyc nyc1 sfo sfo3 sgp sgp1 tor tor1 syd1]
doctl serverless namespaces create --label "example-namespace" --region "fra1"
# doctl serverless connect  # By default, doctl immediately connects to newly created namespaces.
doctl serverless deploy .
```

Learn more about deploying your functions in [the official DigitalOcean Functions documentation](https://docs.digitalocean.com/products/functions/).
